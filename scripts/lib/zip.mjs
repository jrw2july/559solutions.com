import { createHash } from "node:crypto";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { deflateRawSync } from "node:zlib";

const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) {
    value = (value & 1) ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }
  return value >>> 0;
});

const crc32 = (buffer) => {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
};

const dosDateTime = (date) => {
  const year = Math.max(date.getFullYear(), 1980);
  const time =
    (date.getHours() << 11) |
    (date.getMinutes() << 5) |
    Math.floor(date.getSeconds() / 2);
  const day =
    ((year - 1980) << 9) |
    ((date.getMonth() + 1) << 5) |
    date.getDate();
  return { time, day };
};

const walk = async (root, relative = "", shouldInclude = () => true) => {
  const absolute = path.join(root, relative);
  const entries = await readdir(absolute, { withFileTypes: true });
  const files = [];

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const nextRelative = path.join(relative, entry.name);
    const normalized = nextRelative.replaceAll(path.sep, "/");
    if (!shouldInclude(normalized, entry)) continue;
    if (entry.isDirectory()) {
      files.push(...(await walk(root, nextRelative, shouldInclude)));
    } else if (entry.isFile()) {
      files.push(nextRelative);
    }
  }

  return files;
};

export async function createZip({ root, destination, shouldInclude }) {
  const files = await walk(root, "", shouldInclude);
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  // Folder entries with Unix mode rwxr-xr-x (0755), so the server can open every folder.
  const folders = [...new Set(files.flatMap((relative) => {
    const parts = relative.split(path.sep).slice(0, -1);
    return parts.map((_, index) => parts.slice(0, index + 1).join("/") + "/");
  }))].sort();
  const now = dosDateTime(new Date());
  for (const folder of folders) {
    const name = Buffer.from(folder, "utf8");
    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0x0800, 6);
    localHeader.writeUInt16LE(0, 8);
    localHeader.writeUInt16LE(now.time, 10);
    localHeader.writeUInt16LE(now.day, 12);
    localHeader.writeUInt16LE(name.length, 26);
    localParts.push(localHeader, name);
    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(0x02014b50, 0);
    centralHeader.writeUInt16LE(0x0314, 4);
    centralHeader.writeUInt16LE(20, 6);
    centralHeader.writeUInt16LE(0x0800, 8);
    centralHeader.writeUInt16LE(0, 10);
    centralHeader.writeUInt16LE(now.time, 12);
    centralHeader.writeUInt16LE(now.day, 14);
    centralHeader.writeUInt16LE(name.length, 28);
    centralHeader.writeUInt32LE((((0o040755 << 16) >>> 0) | 0x10) >>> 0, 38);
    centralHeader.writeUInt32LE(offset, 42);
    centralParts.push(centralHeader, name);
    offset += localHeader.length + name.length;
  }

  for (const relative of files) {
    const absolute = path.join(root, relative);
    const metadata = await stat(absolute);
    const source = await readFile(absolute);
    const compressed = deflateRawSync(source, { level: 9 });
    const name = Buffer.from(relative.replaceAll(path.sep, "/"), "utf8");
    const checksum = crc32(source);
    const { time, day } = dosDateTime(metadata.mtime);

    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0x0800, 6);
    localHeader.writeUInt16LE(8, 8);
    localHeader.writeUInt16LE(time, 10);
    localHeader.writeUInt16LE(day, 12);
    localHeader.writeUInt32LE(checksum, 14);
    localHeader.writeUInt32LE(compressed.length, 18);
    localHeader.writeUInt32LE(source.length, 22);
    localHeader.writeUInt16LE(name.length, 26);
    localHeader.writeUInt16LE(0, 28);

    localParts.push(localHeader, name, compressed);

    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(0x02014b50, 0);
    centralHeader.writeUInt16LE(0x0314, 4);
    centralHeader.writeUInt16LE(20, 6);
    centralHeader.writeUInt16LE(0x0800, 8);
    centralHeader.writeUInt16LE(8, 10);
    centralHeader.writeUInt16LE(time, 12);
    centralHeader.writeUInt16LE(day, 14);
    centralHeader.writeUInt32LE(checksum, 16);
    centralHeader.writeUInt32LE(compressed.length, 20);
    centralHeader.writeUInt32LE(source.length, 24);
    centralHeader.writeUInt16LE(name.length, 28);
    centralHeader.writeUInt16LE(0, 30);
    centralHeader.writeUInt16LE(0, 32);
    centralHeader.writeUInt16LE(0, 34);
    centralHeader.writeUInt16LE(0, 36);
    // External attributes: Unix mode rw-r--r-- (0644) in the high 16 bits. Without it, servers that
    // unzip on Linux (cPanel File Manager) can create files nobody may read, so CSS and new pages fail.
    centralHeader.writeUInt32LE(((0o100644 << 16) >>> 0), 38);
    centralHeader.writeUInt32LE(offset, 42);
    centralParts.push(centralHeader, name);

    offset += localHeader.length + name.length + compressed.length;
  }

  const centralDirectory = Buffer.concat(centralParts);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(files.length + folders.length, 8);
  end.writeUInt16LE(files.length + folders.length, 10);
  end.writeUInt32LE(centralDirectory.length, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);

  const archive = Buffer.concat([...localParts, centralDirectory, end]);
  await writeFile(destination, archive);

  return {
    files,
    bytes: archive.length,
    sha256: createHash("sha256").update(archive).digest("hex"),
  };
}

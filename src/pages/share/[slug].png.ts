import type { APIRoute, GetStaticPaths } from "astro";
import { renderShareImage, shareImages } from "@/lib/share-image.mjs";

// Build-time share images (src/lib/share-image.mjs). A page whose drawing fails gets no file here and
// falls back to /images/og.png.
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  for (const image of shareImages) {
    if (await renderShareImage(image.slug)) paths.push({ params: { slug: image.slug } });
  }
  return paths;
};

export const GET: APIRoute = async ({ params }) => {
  const png = await renderShareImage(String(params.slug));
  if (!png) return new Response(null, { status: 404 });
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};

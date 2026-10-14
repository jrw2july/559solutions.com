import { sitePath } from "@/config/site";

export const prerender = true;

export function GET() {
  return new Response(
    JSON.stringify({
      name: "559 Solutions",
      short_name: "559 Solutions",
      description:
        "Practical AI, automation, low-code resources, and plain-language systems guidance.",
      start_url: sitePath("/"),
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#104dc9",
      icons: [
        {
          src: sitePath("/images/559-icon-512.png"),
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
      ],
    }),
    {
      headers: {
        "Content-Type": "application/manifest+json; charset=utf-8",
      },
    },
  );
}

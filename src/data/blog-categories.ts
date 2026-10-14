// The Curious Architect blog categories and their icons (2026-10-14). The icons are cut from
// David Wells's drawing (Code559-packets/brand-assets/curious-architect). The Systems Thinking icon
// combines his whole face with his rayed lightbulb above it, as in the original.
// Keep the names in step with the `category` enum in src/content.config.ts.
import type { ImageMetadata } from "astro";
import iconAi from "@/assets/curious-architect/icon-ai.png";
import iconBuilderNotes from "@/assets/curious-architect/icon-builder-notes.png";
import iconNotebook from "@/assets/curious-architect/icon-notebook.png";
import iconSmallBusiness from "@/assets/curious-architect/icon-small-business.png";
import iconSystems from "@/assets/curious-architect/icon-systems.png";

export const blogCategories: { name: string; icon: ImageMetadata }[] = [
  { name: "AI Without the Hype", icon: iconAi },
  { name: "Systems Thinking", icon: iconSystems },
  { name: "Small Business Tools", icon: iconSmallBusiness },
  { name: "Builder Notes", icon: iconBuilderNotes },
  { name: "Architect's Notebook", icon: iconNotebook },
];

export const categoryIcon = (name: string) => blogCategories.find((item) => item.name === name)?.icon;

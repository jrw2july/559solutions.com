// AI tools quick reference (updated 2026-10-14 from the 2025 "Weekend CTO" table).
// Each row was checked against the vendor's own site on the date below. Keep claims short and
// factual; recheck every row when you update the date.
export const aiToolsCheckedOn = "October 14, 2026";

export interface AiTool {
  category: string;
  tool: string;
  bestFor: string;
  strength: string;
  url: string;
  note?: string;
}

export const aiTools: AiTool[] = [
  { category: "General chat and writing", tool: "ChatGPT", bestFor: "Writing, brainstorming, code help, images", strength: "Broad all-round assistant", url: "https://chatgpt.com" },
  { category: "General chat and analysis", tool: "Claude", bestFor: "Long documents and careful analysis", strength: "Works through large files and multi-step tasks", url: "https://claude.com/product/overview" },
  { category: "Answer engine", tool: "Perplexity", bestFor: "Fast answers from the live web", strength: "Every answer links to its sources", url: "https://www.perplexity.ai" },
  { category: "Work copilot (Microsoft)", tool: "Microsoft 365 Copilot", bestFor: "Outlook, Word, Excel, PowerPoint, Teams", strength: "AI inside the Microsoft apps you already use", url: "https://www.microsoft.com/en-us/microsoft-365/copilot/business" },
  { category: "Work copilot (Google)", tool: "Gemini in Google Workspace", bestFor: "Gmail, Docs, Sheets, Drive", strength: "Works in a side panel inside Google's apps", url: "https://workspace.google.com/solutions/ai/" },
  { category: "Design", tool: "Canva AI", bestFor: "Social posts, flyers, presentations", strength: "Design and generate in one place", url: "https://www.canva.com/magic/", note: "Formerly Canva Magic Studio" },
  { category: "Image generator", tool: "Midjourney", bestFor: "Concept art and stylized images", strength: "Strong artistic look", url: "https://www.midjourney.com" },
  { category: "Image generator", tool: "ChatGPT Images", bestFor: "Images and edits inside ChatGPT", strength: "Make and change images by asking", url: "https://openai.com/index/introducing-chatgpt-images-2-0/", note: "Replaced DALL·E" },
  { category: "Image generator", tool: "Stable Diffusion 3.5", bestFor: "Image generation on your own systems", strength: "Self-hosting under a Stability AI license", url: "https://stability.ai/stable-image", note: "Successor to SDXL" },
  { category: "Video generator", tool: "Runway", bestFor: "Short ads, explainers, storyboards", strength: "Text-to-video generation (Gen-4.5)", url: "https://runway.com" },
  { category: "Voice", tool: "ElevenLabs", bestFor: "Voiceovers, audiobooks, dubbing", strength: "Lifelike voices, cloning and dubbing", url: "https://elevenlabs.io" },
  { category: "Coding", tool: "GitHub Copilot", bestFor: "Code suggestions, chat and agents in your editor", strength: "Works in VS Code, Visual Studio, JetBrains and more", url: "https://github.com/features/copilot" },
  { category: "Coding", tool: "Cursor", bestFor: "Building software with AI coding agents", strength: "Agents that can work in parallel", url: "https://cursor.com" },
  { category: "Automation", tool: "Zapier", bestFor: "AI steps and agents across your apps", strength: "Connects 9,000+ apps (Zapier's count)", url: "https://zapier.com/ai" },
  { category: "Internal tools", tool: "Airtable AI", bestFor: "Simple internal business apps", strength: "Build tables and automations by conversation", url: "https://www.airtable.com/platform/ai" },
  { category: "Team docs", tool: "Notion AI", bestFor: "Meeting notes, search and Q&A in your docs", strength: "AI inside your wiki and documents", url: "https://www.notion.com/product/ai" },
  { category: "Visual collaboration", tool: "Miro AI", bestFor: "Brainstorms, mapping, planning", strength: "Generates diagrams, timelines and boards", url: "https://miro.com/ai/" },
];

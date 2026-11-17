// AI tools quick reference (updated 2026-10-14 from the 2025 "Weekend CTO" table).
// Each row was checked against the vendor's own site on the date below. Keep claims short and
// factual; recheck every row when you update the date.
// 2026-11-17: wording made consistent (Best for = a short noun phrase; Standout strength starts with a verb).
// No claim was added, so the checked date below is unchanged.
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
  { category: "General chat and writing", tool: "ChatGPT", bestFor: "Writing, brainstorming, code help and images", strength: "Handles many kinds of everyday tasks", url: "https://chatgpt.com" },
  { category: "General chat and analysis", tool: "Claude", bestFor: "Long documents and careful analysis", strength: "Works through large files and multi-step tasks", url: "https://claude.com/product/overview" },
  { category: "Answer engine", tool: "Perplexity", bestFor: "Fast answers from the live web", strength: "Links every answer to its sources", url: "https://www.perplexity.ai" },
  { category: "AI copilot (Microsoft)", tool: "Microsoft 365 Copilot", bestFor: "Work in Outlook, Word, Excel, PowerPoint and Teams", strength: "Works inside the Microsoft apps you use", url: "https://www.microsoft.com/en-us/microsoft-365/copilot/business" },
  { category: "AI copilot (Google)", tool: "Gemini in Google Workspace", bestFor: "Work in Gmail, Docs, Sheets and Drive", strength: "Works in a side panel inside Google's apps", url: "https://workspace.google.com/solutions/ai/" },
  { category: "Design", tool: "Canva AI", bestFor: "Social posts, flyers and presentations", strength: "Lets you design and generate in one place", url: "https://www.canva.com/magic/", note: "Formerly Canva Magic Studio" },
  { category: "Image generator", tool: "Midjourney", bestFor: "Concept art and stylized images", strength: "Produces a strong artistic look", url: "https://www.midjourney.com" },
  // ChatGPT Images: this link is an announcement article, not a product page. On 2026-11-17 no official
  // product page could be confirmed (OpenAI's sites refused automated requests), so the link is unchanged.
  { category: "Image generator", tool: "ChatGPT Images", bestFor: "Making and editing images inside ChatGPT", strength: "Makes and changes images when you ask", url: "https://openai.com/index/introducing-chatgpt-images-2-0/", note: "Replaced DALL·E" },
  { category: "Image generator", tool: "Stable Diffusion 3.5", bestFor: "Generating images on your own systems", strength: "Allows self-hosting under a Stability AI license", url: "https://stability.ai/stable-image", note: "Successor to SDXL" },
  { category: "Video generator", tool: "Runway", bestFor: "Short ads, explainers and storyboards", strength: "Generates video from text (Gen-4.5)", url: "https://runway.com" },
  { category: "Voice", tool: "ElevenLabs", bestFor: "Voiceovers, audiobooks and dubbing", strength: "Produces lifelike voices, cloning and dubbing", url: "https://elevenlabs.io" },
  { category: "Coding", tool: "GitHub Copilot", bestFor: "Code suggestions, chat and agents in your editor", strength: "Works in VS Code, Visual Studio, JetBrains and more", url: "https://github.com/features/copilot" },
  { category: "Coding", tool: "Cursor", bestFor: "Building software with AI coding agents", strength: "Runs agents that can work in parallel", url: "https://cursor.com" },
  { category: "Automation", tool: "Zapier", bestFor: "AI steps and agents across your apps", strength: "Connects 9,000+ apps (Zapier's count)", url: "https://zapier.com/ai" },
  { category: "Internal tools", tool: "Airtable AI", bestFor: "Simple internal business apps", strength: "Builds tables and automations by conversation", url: "https://www.airtable.com/platform/ai" },
  { category: "Team docs", tool: "Notion AI", bestFor: "Meeting notes, search and Q&A in your docs", strength: "Works inside your wiki and documents", url: "https://www.notion.com/product/ai" },
  { category: "Visual collaboration", tool: "Miro AI", bestFor: "Brainstorms, mapping and planning", strength: "Generates diagrams, timelines and boards", url: "https://miro.com/ai/" },
];

// Beginner definitions for the terms used in the table (added 2026-11-17). Each one follows the named
// source; recheck the source if you change the wording.
export interface AiTerm {
  term: string;
  definition: string;
}

export const aiTerms: AiTerm[] = [
  { term: "Generative AI", definition: "AI that creates new content, such as text, images, video or sound, by learning patterns from existing data." },
  { term: "AI copilot", definition: "An AI assistant you talk to in plain language. It sits inside the apps you already work in and helps with tasks such as drafting and summarizing." },
  { term: "Answer engine", definition: "A tool that answers a question from the live web and links each answer to its sources." },
  { term: "Automation", definition: "Setting a task up to run by itself: when one thing happens, the tool does the next thing for you." },
];

export const aiTermSources = [
  { label: "Microsoft, What is generative AI?", url: "https://www.microsoft.com/en-us/ai/ai-101/what-is-generative-ai" },
  { label: "Microsoft, What is a copilot?", url: "https://www.microsoft.com/en-us/copilot/ai-knowledge/what-is-copilot" },
  { label: "Zapier, Workflow automation", url: "https://zapier.com/blog/workflow-automation/" },
];

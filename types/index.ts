export interface ToolConfig {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  keywords: string[];
  category: string;
  icon: string;
  howToUse: string[];
  faq: { question: string; answer: string }[];
}

export interface ToolResult<T> {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};

import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { HTMLEncoderTool } from "@/components/tools/html-encoder-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("html-encoder")!);

export default function Page() {
  const tool = getToolBySlug("html-encoder")!;

  return (
    <ToolLayout tool={tool}>
      <HTMLEncoderTool />
    </ToolLayout>
  );
}

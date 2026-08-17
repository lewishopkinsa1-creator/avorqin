import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { HTMLDecoderTool } from "@/components/tools/html-decoder-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("html-decoder")!);

export default function Page() {
  const tool = getToolBySlug("html-decoder")!;

  return (
    <ToolLayout tool={tool}>
      <HTMLDecoderTool />
    </ToolLayout>
  );
}

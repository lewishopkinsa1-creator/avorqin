import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { XMLFormatterTool } from "@/components/tools/xml-formatter-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("xml-formatter")!);

export default function XMLFormatterPage() {
  const tool = getToolBySlug("xml-formatter")!;

  return (
    <ToolLayout tool={tool}>
      <XMLFormatterTool />
    </ToolLayout>
  );
}

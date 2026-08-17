import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { YAMLFormatterTool } from "@/components/tools/yaml-formatter-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("yaml-formatter")!);

export default function Page() {
  const tool = getToolBySlug("yaml-formatter")!;

  return (
    <ToolLayout tool={tool}>
      <YAMLFormatterTool />
    </ToolLayout>
  );
}

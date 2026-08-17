import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { JSONToYAMLTool } from "@/components/tools/json-to-yaml-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("json-to-yaml")!);

export default function Page() {
  const tool = getToolBySlug("json-to-yaml")!;

  return (
    <ToolLayout tool={tool}>
      <JSONToYAMLTool />
    </ToolLayout>
  );
}

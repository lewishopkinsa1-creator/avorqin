import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { YAMLToJSONTool } from "@/components/tools/yaml-to-json-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("yaml-to-json")!);

export default function Page() {
  const tool = getToolBySlug("yaml-to-json")!;

  return (
    <ToolLayout tool={tool}>
      <YAMLToJSONTool />
    </ToolLayout>
  );
}

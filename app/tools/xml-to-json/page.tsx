import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { XMLToJSONTool } from "@/components/tools/xml-to-json-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("xml-to-json")!);

export default function Page() {
  const tool = getToolBySlug("xml-to-json")!;

  return (
    <ToolLayout tool={tool}>
      <XMLToJSONTool />
    </ToolLayout>
  );
}

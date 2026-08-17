import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { JSONToXMLTool } from "@/components/tools/json-to-xml-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("json-to-xml")!);

export default function Page() {
  const tool = getToolBySlug("json-to-xml")!;

  return (
    <ToolLayout tool={tool}>
      <JSONToXMLTool />
    </ToolLayout>
  );
}

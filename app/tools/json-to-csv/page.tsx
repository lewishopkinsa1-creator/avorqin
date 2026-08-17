import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { JSONToCSVTool } from "@/components/tools/json-to-csv-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("json-to-csv")!);

export default function JSONToCSVPage() {
  const tool = getToolBySlug("json-to-csv")!;

  return (
    <ToolLayout tool={tool}>
      <JSONToCSVTool />
    </ToolLayout>
  );
}

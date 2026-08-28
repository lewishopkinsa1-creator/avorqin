import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch201250Tool } from "@/components/tools/batch-201-250-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("json-escape-unescape")!);

export default function Page() {
  const tool = getToolBySlug("json-escape-unescape")!;
  return (
    <ToolLayout tool={tool}>
      <Batch201250Tool kind={"json-escape-unescape"} />
    </ToolLayout>
  );
}

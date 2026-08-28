import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch451485Tool } from "@/components/tools/batch-451-485-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("gallons-to-liters-converter")!);

export default function Page() {
  const tool = getToolBySlug("gallons-to-liters-converter")!;
  return (
    <ToolLayout tool={tool}>
      <Batch451485Tool kind={"gallons-to-liters-converter"} />
    </ToolLayout>
  );
}

import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch451485Tool } from "@/components/tools/batch-451-485-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("liters-to-gallons-converter")!);

export default function Page() {
  const tool = getToolBySlug("liters-to-gallons-converter")!;
  return (
    <ToolLayout tool={tool}>
      <Batch451485Tool kind={"liters-to-gallons-converter"} />
    </ToolLayout>
  );
}

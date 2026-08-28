import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch451485Tool } from "@/components/tools/batch-451-485-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("kmh-to-mph-converter")!);

export default function Page() {
  const tool = getToolBySlug("kmh-to-mph-converter")!;
  return (
    <ToolLayout tool={tool}>
      <Batch451485Tool kind={"kmh-to-mph-converter"} />
    </ToolLayout>
  );
}

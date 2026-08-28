import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch451485Tool } from "@/components/tools/batch-451-485-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("miles-to-kilometers-converter")!);

export default function Page() {
  const tool = getToolBySlug("miles-to-kilometers-converter")!;
  return (
    <ToolLayout tool={tool}>
      <Batch451485Tool kind={"miles-to-kilometers-converter"} />
    </ToolLayout>
  );
}

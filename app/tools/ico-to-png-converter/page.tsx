import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch486500Tool } from "@/components/tools/batch-486-500-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("ico-to-png-converter")!);

export default function Page() {
  const tool = getToolBySlug("ico-to-png-converter")!;
  return (
    <ToolLayout tool={tool}>
      <Batch486500Tool kind={"ico-to-png-converter"} />
    </ToolLayout>
  );
}

import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch486500Tool } from "@/components/tools/batch-486-500-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("png-to-ico-converter")!);

export default function Page() {
  const tool = getToolBySlug("png-to-ico-converter")!;
  return (
    <ToolLayout tool={tool}>
      <Batch486500Tool kind={"png-to-ico-converter"} />
    </ToolLayout>
  );
}

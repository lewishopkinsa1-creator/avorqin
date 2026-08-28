import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch486500Tool } from "@/components/tools/batch-486-500-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("base64-to-svg-decoder")!);

export default function Page() {
  const tool = getToolBySlug("base64-to-svg-decoder")!;
  return (
    <ToolLayout tool={tool}>
      <Batch486500Tool kind={"base64-to-svg-decoder"} />
    </ToolLayout>
  );
}

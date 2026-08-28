import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch486500Tool } from "@/components/tools/batch-486-500-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("svg-to-base64-encoder")!);

export default function Page() {
  const tool = getToolBySlug("svg-to-base64-encoder")!;
  return (
    <ToolLayout tool={tool}>
      <Batch486500Tool kind={"svg-to-base64-encoder"} />
    </ToolLayout>
  );
}

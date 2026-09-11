import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch7591008Tool } from "@/components/tools/batch-759-1008-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("base58-encoder")!);

export default function Page() {
  const tool = getToolBySlug("base58-encoder")!;
  return (
    <ToolLayout tool={tool}>
      <Batch7591008Tool kind="base58-encoder" />
    </ToolLayout>
  );
}

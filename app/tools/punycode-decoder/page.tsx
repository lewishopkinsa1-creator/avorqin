import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch651758Tool } from "@/components/tools/batch-651-758-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(
  getToolBySlug("punycode-decoder")!
);

export default function Page() {
  const tool = getToolBySlug("punycode-decoder")!;

  return (
    <ToolLayout tool={tool}>
      <Batch651758Tool kind="punycode-decoder" />
    </ToolLayout>
  );
}

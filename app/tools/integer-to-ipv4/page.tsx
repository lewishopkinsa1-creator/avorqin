import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch251300Tool } from "@/components/tools/batch-251-300-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("integer-to-ipv4")!);

export default function Page() {
  const tool = getToolBySlug("integer-to-ipv4")!;
  return (
    <ToolLayout tool={tool}>
      <Batch251300Tool kind={"integer-to-ipv4"} />
    </ToolLayout>
  );
}

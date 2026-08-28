import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch251300Tool } from "@/components/tools/batch-251-300-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("ipv6-compressor")!);

export default function Page() {
  const tool = getToolBySlug("ipv6-compressor")!;
  return (
    <ToolLayout tool={tool}>
      <Batch251300Tool kind={"ipv6-compressor"} />
    </ToolLayout>
  );
}

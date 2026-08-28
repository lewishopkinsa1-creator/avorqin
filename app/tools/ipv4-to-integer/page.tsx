import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch251300Tool } from "@/components/tools/batch-251-300-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("ipv4-to-integer")!);

export default function Page() {
  const tool = getToolBySlug("ipv4-to-integer")!;
  return (
    <ToolLayout tool={tool}>
      <Batch251300Tool kind={"ipv4-to-integer"} />
    </ToolLayout>
  );
}

import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch651758Tool } from "@/components/tools/batch-651-758-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(
  getToolBySlug("utf8-byte-counter")!
);

export default function Page() {
  const tool = getToolBySlug("utf8-byte-counter")!;

  return (
    <ToolLayout tool={tool}>
      <Batch651758Tool kind="utf8-byte-counter" />
    </ToolLayout>
  );
}

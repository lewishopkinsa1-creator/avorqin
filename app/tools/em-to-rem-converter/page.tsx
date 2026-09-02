import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch651758Tool } from "@/components/tools/batch-651-758-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(
  getToolBySlug("em-to-rem-converter")!
);

export default function Page() {
  const tool = getToolBySlug("em-to-rem-converter")!;

  return (
    <ToolLayout tool={tool}>
      <Batch651758Tool kind="em-to-rem-converter" />
    </ToolLayout>
  );
}

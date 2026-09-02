import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch651758Tool } from "@/components/tools/batch-651-758-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(
  getToolBySlug("yaml-to-toml-converter")!
);

export default function Page() {
  const tool = getToolBySlug("yaml-to-toml-converter")!;

  return (
    <ToolLayout tool={tool}>
      <Batch651758Tool kind="yaml-to-toml-converter" />
    </ToolLayout>
  );
}

import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch651758Tool } from "@/components/tools/batch-651-758-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(
  getToolBySlug("toml-to-yaml-converter")!
);

export default function Page() {
  const tool = getToolBySlug("toml-to-yaml-converter")!;

  return (
    <ToolLayout tool={tool}>
      <Batch651758Tool kind="toml-to-yaml-converter" />
    </ToolLayout>
  );
}

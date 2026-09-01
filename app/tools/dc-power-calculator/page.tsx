import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch501550Tool } from "@/components/tools/batch-501-550-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("dc-power-calculator")!);

export default function Page() {
  const tool = getToolBySlug("dc-power-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <Batch501550Tool kind={"dc-power-calculator"} />
    </ToolLayout>
  );
}

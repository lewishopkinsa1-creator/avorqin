import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch351400Tool } from "@/components/tools/batch-351-400-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("power-factor-calculator")!);

export default function Page() {
  const tool = getToolBySlug("power-factor-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch351400Tool kind={"power-factor-calculator"} />
    </ToolLayout>
  );
}

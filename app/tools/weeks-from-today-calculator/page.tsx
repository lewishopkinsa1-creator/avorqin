import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch431450Tool } from "@/components/tools/batch-431-450-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("weeks-from-today-calculator")!);

export default function Page() {
  const tool = getToolBySlug("weeks-from-today-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch431450Tool kind={"weeks-from-today-calculator"} />
    </ToolLayout>
  );
}

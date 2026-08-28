import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch401430Tool } from "@/components/tools/batch-401-430-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("reorder-point-calculator")!);

export default function Page() {
  const tool = getToolBySlug("reorder-point-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch401430Tool kind={"reorder-point-calculator"} />
    </ToolLayout>
  );
}

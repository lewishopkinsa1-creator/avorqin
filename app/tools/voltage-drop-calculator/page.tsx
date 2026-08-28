import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch351400Tool } from "@/components/tools/batch-351-400-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("voltage-drop-calculator")!);

export default function Page() {
  const tool = getToolBySlug("voltage-drop-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch351400Tool kind={"voltage-drop-calculator"} />
    </ToolLayout>
  );
}

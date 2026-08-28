import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch351400Tool } from "@/components/tools/batch-351-400-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("volts-to-watts-calculator")!);

export default function Page() {
  const tool = getToolBySlug("volts-to-watts-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch351400Tool kind={"volts-to-watts-calculator"} />
    </ToolLayout>
  );
}

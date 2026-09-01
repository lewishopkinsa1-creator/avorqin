import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch551600Tool } from "@/components/tools/batch-551-600-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("watts-to-kwh-per-day-calculator")!);

export default function Page() {
  const tool = getToolBySlug("watts-to-kwh-per-day-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <Batch551600Tool kind={"watts-to-kwh-per-day-calculator"} />
    </ToolLayout>
  );
}

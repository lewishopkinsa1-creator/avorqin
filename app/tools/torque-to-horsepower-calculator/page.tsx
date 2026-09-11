import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch7591008Tool } from "@/components/tools/batch-759-1008-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("torque-to-horsepower-calculator")!);

export default function Page() {
  const tool = getToolBySlug("torque-to-horsepower-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch7591008Tool kind="torque-to-horsepower-calculator" />
    </ToolLayout>
  );
}

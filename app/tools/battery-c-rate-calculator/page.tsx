import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch551600Tool } from "@/components/tools/batch-551-600-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("battery-c-rate-calculator")!);

export default function Page() {
  const tool = getToolBySlug("battery-c-rate-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <Batch551600Tool kind={"battery-c-rate-calculator"} />
    </ToolLayout>
  );
}

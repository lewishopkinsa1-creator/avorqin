import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch451485Tool } from "@/components/tools/batch-451-485-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("linear-interpolation-calculator")!);

export default function Page() {
  const tool = getToolBySlug("linear-interpolation-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch451485Tool kind={"linear-interpolation-calculator"} />
    </ToolLayout>
  );
}

import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch301350Tool } from "@/components/tools/batch-301-350-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("gravel-driveway-calculator")!);

export default function Page() {
  const tool = getToolBySlug("gravel-driveway-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch301350Tool kind={"gravel-driveway-calculator"} />
    </ToolLayout>
  );
}

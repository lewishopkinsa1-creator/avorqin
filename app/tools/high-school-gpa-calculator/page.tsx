import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch351400Tool } from "@/components/tools/batch-351-400-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("high-school-gpa-calculator")!);

export default function Page() {
  const tool = getToolBySlug("high-school-gpa-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch351400Tool kind={"high-school-gpa-calculator"} />
    </ToolLayout>
  );
}

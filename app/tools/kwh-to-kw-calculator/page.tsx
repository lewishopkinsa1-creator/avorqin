import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch351400Tool } from "@/components/tools/batch-351-400-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("kwh-to-kw-calculator")!);

export default function Page() {
  const tool = getToolBySlug("kwh-to-kw-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch351400Tool kind={"kwh-to-kw-calculator"} />
    </ToolLayout>
  );
}

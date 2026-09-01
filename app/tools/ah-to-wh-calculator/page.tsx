import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch501550Tool } from "@/components/tools/batch-501-550-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("ah-to-wh-calculator")!);

export default function Page() {
  const tool = getToolBySlug("ah-to-wh-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <Batch501550Tool kind={"ah-to-wh-calculator"} />
    </ToolLayout>
  );
}

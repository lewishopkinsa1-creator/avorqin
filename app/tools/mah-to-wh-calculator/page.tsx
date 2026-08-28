import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch351400Tool } from "@/components/tools/batch-351-400-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("mah-to-wh-calculator")!);

export default function Page() {
  const tool = getToolBySlug("mah-to-wh-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch351400Tool kind={"mah-to-wh-calculator"} />
    </ToolLayout>
  );
}

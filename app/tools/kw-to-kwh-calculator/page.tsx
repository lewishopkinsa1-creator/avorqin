import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch351400Tool } from "@/components/tools/batch-351-400-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("kw-to-kwh-calculator")!);

export default function Page() {
  const tool = getToolBySlug("kw-to-kwh-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch351400Tool kind={"kw-to-kwh-calculator"} />
    </ToolLayout>
  );
}

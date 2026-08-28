import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch351400Tool } from "@/components/tools/batch-351-400-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("kw-to-amps-calculator")!);

export default function Page() {
  const tool = getToolBySlug("kw-to-amps-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch351400Tool kind={"kw-to-amps-calculator"} />
    </ToolLayout>
  );
}

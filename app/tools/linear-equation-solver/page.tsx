import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch351400Tool } from "@/components/tools/batch-351-400-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("linear-equation-solver")!);

export default function Page() {
  const tool = getToolBySlug("linear-equation-solver")!;
  return (
    <ToolLayout tool={tool}>
      <Batch351400Tool kind={"linear-equation-solver"} />
    </ToolLayout>
  );
}

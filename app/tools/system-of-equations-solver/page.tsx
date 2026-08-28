import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch351400Tool } from "@/components/tools/batch-351-400-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("system-of-equations-solver")!);

export default function Page() {
  const tool = getToolBySlug("system-of-equations-solver")!;
  return (
    <ToolLayout tool={tool}>
      <Batch351400Tool kind={"system-of-equations-solver"} />
    </ToolLayout>
  );
}

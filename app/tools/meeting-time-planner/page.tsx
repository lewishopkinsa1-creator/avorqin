import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch431450Tool } from "@/components/tools/batch-431-450-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("meeting-time-planner")!);

export default function Page() {
  const tool = getToolBySlug("meeting-time-planner")!;
  return (
    <ToolLayout tool={tool}>
      <Batch431450Tool kind={"meeting-time-planner"} />
    </ToolLayout>
  );
}

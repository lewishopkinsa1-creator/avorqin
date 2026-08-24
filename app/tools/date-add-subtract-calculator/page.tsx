import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { DateTimeTool } from "@/components/tools/date-time-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("date-add-subtract-calculator")!);

export default function Page() {
  const tool = getToolBySlug("date-add-subtract-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <DateTimeTool kind="date-add-subtract-calculator" />
    </ToolLayout>
  );
}

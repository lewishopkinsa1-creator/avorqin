import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { DateTimeTool } from "@/components/tools/date-time-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("hours-calculator")!);

export default function Page() {
  const tool = getToolBySlug("hours-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <DateTimeTool kind="hours-calculator" />
    </ToolLayout>
  );
}

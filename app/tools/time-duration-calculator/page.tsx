import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { DateTimeTool } from "@/components/tools/date-time-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("time-duration-calculator")!);

export default function Page() {
  const tool = getToolBySlug("time-duration-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <DateTimeTool kind="time-duration-calculator" />
    </ToolLayout>
  );
}

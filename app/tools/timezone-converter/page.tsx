import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { DateTimeTool } from "@/components/tools/date-time-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("timezone-converter")!);

export default function Page() {
  const tool = getToolBySlug("timezone-converter")!;

  return (
    <ToolLayout tool={tool}>
      <DateTimeTool kind="timezone-converter" />
    </ToolLayout>
  );
}

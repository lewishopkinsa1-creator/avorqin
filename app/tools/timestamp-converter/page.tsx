import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { TimestampConverterTool } from "@/components/tools/timestamp-converter-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("timestamp-converter")!);

export default function TimestampConverterPage() {
  const tool = getToolBySlug("timestamp-converter")!;
  return (
    <ToolLayout tool={tool}>
      <TimestampConverterTool />
    </ToolLayout>
  );
}

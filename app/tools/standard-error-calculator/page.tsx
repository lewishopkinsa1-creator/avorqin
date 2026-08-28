import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch451485Tool } from "@/components/tools/batch-451-485-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("standard-error-calculator")!);

export default function Page() {
  const tool = getToolBySlug("standard-error-calculator")!;
  return (
    <ToolLayout tool={tool}>
      <Batch451485Tool kind={"standard-error-calculator"} />
    </ToolLayout>
  );
}

import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch651758Tool } from "@/components/tools/batch-651-758-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(
  getToolBySlug("debt-service-coverage-ratio-calculator")!
);

export default function Page() {
  const tool = getToolBySlug("debt-service-coverage-ratio-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <Batch651758Tool kind="debt-service-coverage-ratio-calculator" />
    </ToolLayout>
  );
}

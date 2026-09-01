import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch501550Tool } from "@/components/tools/batch-501-550-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("amps-to-kva-calculator")!);

export default function Page() {
  const tool = getToolBySlug("amps-to-kva-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <Batch501550Tool kind={"amps-to-kva-calculator"} />
    </ToolLayout>
  );
}

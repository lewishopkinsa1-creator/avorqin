import { ToolLayout, generateToolMetadata } from "@/components/shared/tool-layout";
import { Batch551600Tool } from "@/components/tools/batch-551-600-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("120v-amps-to-watts-calculator")!);

export default function Page() {
  const tool = getToolBySlug("120v-amps-to-watts-calculator")!;

  return (
    <ToolLayout tool={tool}>
      <Batch551600Tool kind={"120v-amps-to-watts-calculator"} />
    </ToolLayout>
  );
}

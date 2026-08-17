import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { NumberBaseConverterTool } from "@/components/tools/number-base-converter-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("number-base-converter")!);

export default function Page() {
  const tool = getToolBySlug("number-base-converter")!;

  return (
    <ToolLayout tool={tool}>
      <NumberBaseConverterTool />
    </ToolLayout>
  );
}

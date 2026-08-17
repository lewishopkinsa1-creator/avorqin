import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { TextCaseConverterTool } from "@/components/tools/text-case-converter-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("text-case-converter")!);

export default function Page() {
  const tool = getToolBySlug("text-case-converter")!;

  return (
    <ToolLayout tool={tool}>
      <TextCaseConverterTool />
    </ToolLayout>
  );
}

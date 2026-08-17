import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { RegexTesterTool } from "@/components/tools/regex-tester-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("regex-tester")!);

export default function Page() {
  const tool = getToolBySlug("regex-tester")!;

  return (
    <ToolLayout tool={tool}>
      <RegexTesterTool />
    </ToolLayout>
  );
}

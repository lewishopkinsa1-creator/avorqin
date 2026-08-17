import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { LineSorterTool } from "@/components/tools/line-sorter-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("line-sorter")!);

export default function Page() {
  const tool = getToolBySlug("line-sorter")!;

  return (
    <ToolLayout tool={tool}>
      <LineSorterTool />
    </ToolLayout>
  );
}

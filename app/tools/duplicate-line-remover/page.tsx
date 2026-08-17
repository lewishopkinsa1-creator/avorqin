import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { DuplicateLineRemoverTool } from "@/components/tools/duplicate-line-remover-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("duplicate-line-remover")!);

export default function Page() {
  const tool = getToolBySlug("duplicate-line-remover")!;

  return (
    <ToolLayout tool={tool}>
      <DuplicateLineRemoverTool />
    </ToolLayout>
  );
}

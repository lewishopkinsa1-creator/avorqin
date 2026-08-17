import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { CronExpressionHelperTool } from "@/components/tools/cron-expression-helper-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("cron-expression-helper")!);

export default function Page() {
  const tool = getToolBySlug("cron-expression-helper")!;

  return (
    <ToolLayout tool={tool}>
      <CronExpressionHelperTool />
    </ToolLayout>
  );
}

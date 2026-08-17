import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { UUIDGeneratorTool } from "@/components/tools/uuid-generator-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(
  getToolBySlug("uuid-generator")!
);

export default function UUIDGeneratorPage() {
  const tool = getToolBySlug("uuid-generator")!;

  return (
    <ToolLayout tool={tool}>
      <UUIDGeneratorTool />
    </ToolLayout>
  );
}

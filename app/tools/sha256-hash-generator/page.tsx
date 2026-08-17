import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { SHA256HashGeneratorTool } from "@/components/tools/sha256-hash-generator-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("sha256-hash-generator")!);

export default function Page() {
  const tool = getToolBySlug("sha256-hash-generator")!;

  return (
    <ToolLayout tool={tool}>
      <SHA256HashGeneratorTool />
    </ToolLayout>
  );
}

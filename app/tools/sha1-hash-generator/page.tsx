import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { SHA1HashGeneratorTool } from "@/components/tools/sha1-hash-generator-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("sha1-hash-generator")!);

export default function Page() {
  const tool = getToolBySlug("sha1-hash-generator")!;

  return (
    <ToolLayout tool={tool}>
      <SHA1HashGeneratorTool />
    </ToolLayout>
  );
}

import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { SHA512HashGeneratorTool } from "@/components/tools/sha512-hash-generator-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("sha512-hash-generator")!);

export default function Page() {
  const tool = getToolBySlug("sha512-hash-generator")!;

  return (
    <ToolLayout tool={tool}>
      <SHA512HashGeneratorTool />
    </ToolLayout>
  );
}

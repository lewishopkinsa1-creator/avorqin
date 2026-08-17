import {
  ToolLayout,
  generateToolMetadata,
} from "@/components/shared/tool-layout";
import { PasswordGeneratorTool } from "@/components/tools/password-generator-tool";
import { getToolBySlug } from "@/lib/tools-data";

export const metadata = generateToolMetadata(getToolBySlug("password-generator")!);

export default function Page() {
  const tool = getToolBySlug("password-generator")!;

  return (
    <ToolLayout tool={tool}>
      <PasswordGeneratorTool />
    </ToolLayout>
  );
}

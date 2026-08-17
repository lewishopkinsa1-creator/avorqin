const WORDS = ("lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure dolor reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum").split(" ");

function sentence(wordCount = 12): string {
  const words = Array.from({ length: wordCount }, (_, i) => WORDS[i % WORDS.length]);
  const text = words.join(" ");
  return text[0].toUpperCase() + text.slice(1) + ".";
}

export function lorem(mode: "words" | "sentences" | "paragraphs", count: number): string {
  const n = Math.min(Math.max(Math.floor(count), 1), 50);
  if (mode === "words") return Array.from({ length: n }, (_, i) => WORDS[i % WORDS.length]).join(" ");
  if (mode === "sentences") return Array.from({ length: n }, (_, i) => sentence(10 + (i % 5))).join(" ");
  return Array.from({ length: n }, (_, p) =>
    Array.from({ length: 4 }, (_, i) => sentence(10 + ((p + i) % 5))).join(" ")
  ).join("\n\n");
}

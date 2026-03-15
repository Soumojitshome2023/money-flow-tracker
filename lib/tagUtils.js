export function getSuggestedTags(input, allTags) {
  if (!input) return [];
  const lowerInput = input.toLowerCase();
  return allTags.filter((tag) => tag.toLowerCase().includes(lowerInput));
}

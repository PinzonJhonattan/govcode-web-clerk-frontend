export function getFinalStringRoleNames(string: string): string {
  const matched = string?.match(/actor_(.*)/);
  return matched && matched[1] ? matched[1].replace(/-/g, ' - ') : string;
}

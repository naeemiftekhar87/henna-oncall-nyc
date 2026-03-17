import { prisma } from "./db";

export async function getSiteConfig(): Promise<Record<string, string>> {
  const configs = await prisma.siteConfig.findMany();
  const map: Record<string, string> = {};
  for (const c of configs) {
    map[c.key] = c.value;
  }
  return map;
}

import { contentfulClient } from "./contentful";
import type { PageEntry, PageSkeleton } from "@/types/dataTypes";

/**
 * Fetches a single Page entry whose `slug` field matches the provided value.
 *
 * `include: 10` instructs Contentful to resolve all nested entry/asset links
 * up to 10 levels deep — enough to fully hydrate the `components` array.
 *
 * `withoutUnresolvableLinks` removes any dangling references (e.g. unpublished
 * entries) from the response instead of leaving them as bare link objects,
 * which gives us cleaner TypeScript types downstream.
 *
 * @param slug - The URL slug to look up (e.g. "home", "about-us")
 * @returns The resolved Page entry, or `null` if none was found.
 */
export async function getPageBySlug(slug: string): Promise<PageEntry | null> {
  const response = await contentfulClient.withoutUnresolvableLinks.getEntries<PageSkeleton>({
    content_type: "page",
    "fields.slug": slug,
    include: 10,
    limit: 1,
  });

  return response.items[0] ?? null;
}

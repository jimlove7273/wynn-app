import { contentfulClient } from "./contentful";
import type {
  FooterEntry,
  FooterSkeleton,
  HeaderEntry,
  HeaderSkeleton,
  NavigationEntry,
  NavigationSkeleton,
} from "@/types/dataTypes";

/**
 * Fetches the single Header entry from Contentful.
 * Contentful content type API ID: "header"
 */
export async function getHeader(): Promise<HeaderEntry | null> {
  const response = await contentfulClient.withoutUnresolvableLinks.getEntries<HeaderSkeleton>({
    content_type: "header",
    include: 2,
    limit: 1,
  });

  return response.items[0] ?? null;
}

/**
 * Fetches the single Footer entry from Contentful.
 * Contentful content type API ID: "footer"
 */
export async function getFooter(): Promise<FooterEntry | null> {
  const response = await contentfulClient.withoutUnresolvableLinks.getEntries<FooterSkeleton>({
    content_type: "footer",
    include: 1,
    limit: 1,
  });

  return response.items[0] ?? null;
}

/**
 * Fetches the single Navigation entry from Contentful, with its nested
 * navigationItem links resolved (include: 2).
 * Contentful content type API ID: "navigation"
 */
export async function getNavigation(): Promise<NavigationEntry | null> {
  const response = await contentfulClient.withoutUnresolvableLinks.getEntries<NavigationSkeleton>({
    content_type: "navigation",
    include: 2,
    limit: 1,
  });

  return response.items[0] ?? null;
}

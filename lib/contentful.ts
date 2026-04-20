import { createClient } from "contentful";

/** Contentful Delivery API client — read-only, used for fetching published content. */
export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

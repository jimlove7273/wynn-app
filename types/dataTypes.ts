import type {
  Asset,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
} from "contentful";

// ─── Skeleton types ────────────────────────────────────────────────────────────
// These describe content type shapes for the Contentful SDK's generic parameters.
// contentTypeId must match the API ID set in your Contentful space exactly.

export interface HeroSkeleton extends EntrySkeletonType {
  contentTypeId: "hero";
  fields: {
    heading: EntryFieldTypes.Symbol;
    subheading: EntryFieldTypes.Symbol;
    backgroundImage: EntryFieldTypes.AssetLink;
  };
}

export interface PromoSkeleton extends EntrySkeletonType {
  contentTypeId: "promo";
  fields: {
    image: EntryFieldTypes.AssetLink;
    title: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
    ctaLabel: EntryFieldTypes.Symbol;
    ctaUrl: EntryFieldTypes.Symbol;
    imagePosition: EntryFieldTypes.Symbol;
  };
}

/** Union of every skeleton that can appear in Page.components */
export type ComponentSkeleton = HeroSkeleton | PromoSkeleton;

export interface PageSkeleton extends EntrySkeletonType {
  contentTypeId: "page";
  fields: {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    /** Reference field (Many) → resolves to Hero or Promo entries */
    components: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<ComponentSkeleton>
    >;
  };
}

export interface HeaderSkeleton extends EntrySkeletonType {
  contentTypeId: "header";
  fields: {
    logo: EntryFieldTypes.AssetLink;
    siteName: EntryFieldTypes.Symbol;
  };
}

export interface NavigationSkeleton extends EntrySkeletonType {
  contentTypeId: "navigation";
  fields: {
    title: EntryFieldTypes.Symbol;
    /** Array of strings for navigation items */
    items: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  };
}

export interface FooterSkeleton extends EntrySkeletonType {
  contentTypeId: "footer";
  fields: {
    /** Array of strings for footer links */
    links: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    copyrightText: EntryFieldTypes.Symbol;
  };
}

// ─── Convenience type aliases ──────────────────────────────────────────────────
// Use these as prop types in React components so you don't have to repeat
// the verbose Entry<…, 'WITHOUT_UNRESOLVABLE_LINKS'> signature everywhere.

export type HeroEntry = Entry<HeroSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;
export type PromoEntry = Entry<PromoSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;
export type PageEntry = Entry<PageSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;
export type HeaderEntry = Entry<HeaderSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;
export type NavigationEntry = Entry<
  NavigationSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS"
>;
export type FooterEntry = Entry<FooterSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;

/** A resolved Contentful image asset (shorthand for component props). */
export type ImageAsset = Asset<"WITHOUT_UNRESOLVABLE_LINKS">;

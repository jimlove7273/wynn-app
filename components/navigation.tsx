import Link from "next/link";
import { getNavigation } from "@/lib/fetchGlobals";

/**
 * Server Component — fetches the "navigation" content type from Contentful.
 */
export default async function Navigation() {
  const nav = await getNavigation();

  if (!nav) return null;

  // Accessing 'items' field directly as discovered during troubleshooting
  // expect-error - Ignoring if the generated type hasn't refreshed yet
  const items = nav.fields.items;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return null;
  }

  /**
   * Helper to convert display labels into URL slugs.
   * 'Home' -> '/'
   * 'About Us' -> '/about-us'
   */
  const getSlug = (label: string) => {
    if (label.toLowerCase() === "home") return "/home";
    return `/${label.toLowerCase().replace(/\s+/g, "-")}`;
  };

  return (
    <nav
      aria-label="Main navigation"
      className="w-full bg-zinc-100 border-b border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800"
    >
      <ul className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-2">
        {items.map((label: string, index: number) => (
          <li key={`${label}-${index}`}>
            <Link
              href={getSlug(label)}
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

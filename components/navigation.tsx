import Link from "next/link";
import { getNavigation } from "@/lib/fetchGlobals";
import type { NavigationItemEntry } from "@/types/dataTypes";

export default async function Navigation() {
  const nav = await getNavigation();

  if (!nav) return null;

  const { links } = nav.fields;

  // Filter out any undefined slots left by withoutUnresolvableLinks
  const resolvedLinks = (links ?? []).filter(
    (item): item is NavigationItemEntry => item != null && "fields" in item,
  );

  if (resolvedLinks.length === 0) return null;

  return (
    <nav
      aria-label="Main navigation"
      className="w-full bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800"
    >
      <ul className="mx-auto flex max-w-7xl items-center gap-1 px-6 py-2">
        {resolvedLinks.map((item) => (
          <li key={item.sys.id}>
            <Link
              href={item.fields.url}
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
            >
              {item.fields.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

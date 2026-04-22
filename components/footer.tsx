import { getFooter } from "@/lib/fetchGlobals";
import Link from "next/link";

export default async function Footer() {
  const footer = await getFooter();

  if (!footer) return null;

  const { links, copyrightText } = footer.fields;

  // links is now typed as string[] in dataTypes.ts
  const footerLinks = Array.isArray(links) ? links : [];

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
    <footer className="w-full border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        {footerLinks.length > 0 && (
          <nav aria-label="Footer Navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {footerLinks.map((link, index) => (
                <li key={`${link}-${index}`}>
                  <span className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 cursor-default">
                    <Link href={getSlug(link)}>{link}</Link>
                  </span>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {copyrightText && (
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            {copyrightText}
          </p>
        )}
      </div>
    </footer>
  );
}

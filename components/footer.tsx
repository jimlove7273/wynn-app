import { getFooter } from "@/lib/fetchGlobals";

export default async function Footer() {
  const footer = await getFooter();

  if (!footer) return null;

  const { links, copyrightText } = footer.fields;

  console.log("links", links);

  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        {links && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre">
            {Array.isArray(links) ? links.join("  ") : links}
          </p>
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

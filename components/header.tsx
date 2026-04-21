import Image from "next/image";
import { getHeader } from "@/lib/fetchGlobals";

/**
 * Server Component — fetches the "header" content type from Contentful and
 * renders the site logo + name.  Drop this directly into app/layout.tsx.
 */
export default async function Header() {
  const header = await getHeader();

  if (!header) return null;

  const { logo, siteName } = header.fields;

  const logoFile = logo?.fields.file;
  const logoUrl = logoFile?.url ? `https:${logoFile.url}` : null;
  const logoWidth = logoFile?.details.image?.width ?? 120;
  const logoHeight = logoFile?.details.image?.height ?? 40;
  const logoAlt = logo?.fields.title ?? siteName;

  return (
    <header className="w-full border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={logoAlt}
            width={logoWidth}
            height={logoHeight}
            className="h-10 w-auto object-contain"
            priority
          />
        ) : null}

        {siteName && (
          <span className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {siteName}
          </span>
        )}
      </div>
    </header>
  );
}

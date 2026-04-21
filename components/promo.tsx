import Image from "next/image";
import type { PromoEntry } from "@/types/dataTypes";

type PromoProps = {
  entry: PromoEntry;
};

export default function Promo({ entry }: PromoProps) {
  const { image, title, description, ctaLabel, ctaUrl, imagePosition } =
    entry.fields;

  const imgUrl = image?.fields.file?.url;
  const imgAlt = image?.fields.title ?? title;
  const imgWidth = image?.fields.file?.details.image?.width ?? 800;
  const imgHeight = image?.fields.file?.details.image?.height ?? 600;

  const isImageLeft = imagePosition?.toLowerCase() !== "right";

  return (
    <section className="py-16 px-6">
      <div
        className={`max-w-5xl mx-auto flex flex-col gap-10 items-center md:flex-row ${
          isImageLeft ? "" : "md:flex-row-reverse"
        }`}
      >
        {imgUrl && (
          <div className="flex-1 relative w-full">
            <Image
              src={`https:${imgUrl}`}
              alt={imgAlt ?? ""}
              width={imgWidth}
              height={imgHeight}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        )}

        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {title}
          </h2>

          {description && (
            <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          )}

          {ctaLabel && ctaUrl && (
            <a
              href={ctaUrl}
              className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {ctaLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

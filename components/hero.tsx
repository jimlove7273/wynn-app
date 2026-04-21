import Image from "next/image";
import type { HeroEntry } from "@/types/dataTypes";

type HeroProps = {
  entry: HeroEntry;
};

export default function Hero({ entry }: HeroProps) {
  const { heading, subheading, backgroundImage } = entry.fields;

  const imgFile = backgroundImage?.fields.file;
  const imgUrl = imgFile?.url ? `https:${imgFile.url}` : null;
  const imgWidth = imgFile?.details.image?.width ?? 1920;
  const imgHeight = imgFile?.details.image?.height ?? 1080;
  const imgAlt = backgroundImage?.fields.title ?? heading;

  return (
    <section className="relative flex items-center justify-center min-h-[60vh] overflow-hidden bg-zinc-800 text-white">
      {/* Background image */}
      {imgUrl && (
        <Image
          src={imgUrl}
          alt={imgAlt}
          width={imgWidth}
          height={imgHeight}
          priority
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Dark overlay */}
      {imgUrl && (
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-left">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {heading}
        </h1>
        {subheading && (
          <p className="mt-6 text-lg leading-8 text-zinc-200 sm:text-xl">
            {subheading}
          </p>
        )}
      </div>
    </section>
  );
}

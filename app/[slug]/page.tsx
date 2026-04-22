import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/fetchPage";
import ComponentRenderer from "@/components/ComponentRenderer";

/**
 * Dynamically generates metadata (e.g., browser title) based on the page's
 * Contentful data. Runs on the server at request time.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  return {
    title: page?.fields.title ?? "Page Not Found",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <ComponentRenderer components={page.fields.components ?? []} />;
}

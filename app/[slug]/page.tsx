import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/fetchPage";
import ComponentRenderer from "@/components/ComponentRenderer";

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

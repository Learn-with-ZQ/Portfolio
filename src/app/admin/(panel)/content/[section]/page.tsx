import { notFound } from "next/navigation";
import { AdminApiError, getSection } from "@/lib/admin-api";
import { findSection } from "@/components/admin/content/sections";
import { SectionEditor } from "@/components/admin/content/section-editor";
import { ErrorPanel } from "@/components/admin/error-panel";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

interface SectionPageProps {
  params: Promise<{ section: string }>;
}

export async function generateMetadata({ params }: SectionPageProps) {
  const def = findSection((await params).section);
  return { title: def?.title ?? "Content" };
}

export default async function AdminSectionPage({ params }: SectionPageProps) {
  const def = findSection((await params).section);
  if (!def) notFound();

  let data: unknown = null;
  let error = "";
  try {
    data = await getSection(def.endpoint);
  } catch (e) {
    if (!(e instanceof AdminApiError)) throw e;
    error = e.message;
  }

  return (
    <>
      <AdminPageHeader
        trail={[
          { href: "/admin", label: "Dashboard" },
          { href: "/admin/content", label: "Content" },
          { label: def.group },
        ]}
        title={def.title}
        description={def.description}
      />
      <div className="mt-8">
        {error ? (
          <ErrorPanel message={error} />
        ) : (
          // Remount on a fresh load so the editor starts from the saved data.
          <SectionEditor key={def.slug} slug={def.slug} initial={data} />
        )}
      </div>
    </>
  );
}

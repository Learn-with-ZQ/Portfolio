import { getTestimonials, AdminApiError } from "@/lib/admin-api";
import { ErrorPanel } from "@/components/admin/error-panel";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { FilterTabs } from "@/components/admin/filter-tabs";
import { TestimonialItem } from "@/components/admin/testimonial-item";
import type { AdminTestimonial, TestimonialFilter } from "@/types/admin";

export const metadata = { title: "Testimonials" };

const FILTERS: { value: TestimonialFilter; label: string }[] = [
  { value: "Pending", label: "Waiting for review" },
  { value: "Approved", label: "Published" },
  { value: "Rejected", label: "Rejected" },
  { value: "all", label: "All" },
];

const EMPTY: Record<TestimonialFilter, string> = {
  Pending: "Nothing waiting for review.",
  Approved: "No published testimonials yet.",
  Rejected: "No rejected testimonials.",
  all: "No testimonials yet.",
};

interface TestimonialsPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminTestimonialsPage({ searchParams }: TestimonialsPageProps) {
  const requested = (await searchParams).status;
  const filter: TestimonialFilter =
    FILTERS.find((f) => f.value === requested)?.value ?? "Pending";

  let testimonials: AdminTestimonial[] = [];
  let error = "";
  try {
    testimonials = await getTestimonials(filter);
  } catch (e) {
    if (!(e instanceof AdminApiError)) throw e;
    error = e.message;
  }

  return (
    <>
      <AdminPageHeader
        trail={[{ href: "/admin", label: "Dashboard" }, { label: "Inbox" }]}
        title="Testimonials"
        description="Approving publishes a testimonial on the site straight away. Any edit by its author brings it back here for review."
      />
      <div className="mt-6">
        <FilterTabs
          label="Testimonial status"
          tabs={FILTERS.map((f) => ({
            href: `/admin/testimonials?status=${f.value}`,
            label: f.label,
            active: f.value === filter,
          }))}
        />
      </div>

      <div className="mt-6">
        {error ? (
          <ErrorPanel message={error} />
        ) : testimonials.length === 0 ? (
          <p className="type-body text-ink-muted">{EMPTY[filter]}</p>
        ) : (
          <ul className="grid max-w-3xl gap-4">
            {testimonials.map((t) => (
              <li key={t.id}>
                <TestimonialItem testimonial={t} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

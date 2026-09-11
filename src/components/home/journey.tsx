import { Section, SectionHeading } from "@/components/ui/section";

const storyItems = [
  {
    title: "Current role",
    body: "Software Developer at E-Creatorz, deployed as Resident Engineer at IoBM — owning delivery and production support for enterprise systems.",
  },
  {
    title: "Current studies",
    body: "Pursuing an MS in Data Science at NED University, building on a BS in Computer Science from PAF-KIET.",
  },
  {
    title: "Leadership and speaking",
    body: "Active in community leadership, organizing committees and public speaking — delivering events and mentoring peers.",
  },
  {
    title: "Career goals",
    body: "Growing toward solution architecture — combining backend engineering depth with data science to deliver measurable business value.",
  },
];

export function Journey() {
  return (
    <Section rule labelledBy="story-title">
      <SectionHeading
        id="story-title"
        title="A practice shaped by delivery and curiosity"
        description="The milestones, roles, and ambitions that continue to define how I build."
      />
      <dl className="grid gap-x-12 md:grid-cols-2">
        {storyItems.map((item) => (
          <div key={item.title} className="border-t border-rule py-6">
            <dt className="type-h3">{item.title}</dt>
            <dd className="type-body mt-2 text-ink-muted">{item.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

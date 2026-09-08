# SEO & Personal Branding Strategy — Muhammad Zaid Qasim

_Prepared as an audit + action plan for muhammadzaidqasim.vercel.app_

---

## 0. Read this first — realistic expectations

An honest consultant sets targets you can actually hit. Your keyword list mixes
two very different difficulty tiers:

| Keyword | Can a personal portfolio rank #1? | Why |
|---|---|---|
| Muhammad Zaid Qasim | **Yes — you can own the whole first page** | Unique name, low competition |
| Zaid Qasim | **Yes, top 1–3** | Fairly unique |
| Muhammad Zaid | Top 10 possible, not #1 | Very common name |
| Zaid | **No** | Millions of people/brands named Zaid |
| Ned / Kiet | **No** | These are universities/other entities; you can't outrank NED University for "Ned" |
| .NET Developer | **No** | SERP = Indeed, LinkedIn Jobs, Microsoft, roadmap.sh, courses |
| Full Stack / Backend / Software / Mobile App Developer | **No** | Same — global generic job terms owned by job boards & Wikipedia |
| Prompt Engineer | **No** (and you have no content proving it yet) | Generic + unproven for you |

**The winnable game is threefold:**

1. **Own your name completely.** When a recruiter hears "Muhammad Zaid Qasim" and
   Googles it, your portfolio + LinkedIn + GitHub should be the entire first page.
   This is where 90% of the real-world value is — recruiters search *names*, not
   "software developer".
2. **Win long-tail + geo variants:** ".NET developer Karachi", "React Native
   developer Pakistan", "Muhammad Zaid Qasim .NET", "ASP.NET Core developer
   Karachi". Low competition, real recruiter intent.
3. **Rank inside platforms that already have authority** (LinkedIn, GitHub,
   Stack Overflow, Dev.to) for the generic role terms — you rank *there*, not on
   your own domain, and link back to your portfolio.

Chasing "#1 for Software Developer" is not a real goal — redirect that energy
into the three winnable plays above.

---

## 1. What has already been implemented (on-page)

These changes are live in the codebase (commit them + redeploy):

- **Structured data (`src/lib/schema.ts`)** — the Person JSON-LD now carries:
  - `jobTitle` as an array: .NET Developer, Full-Stack Developer, Backend Engineer,
    Software Developer, Mobile App Developer
  - `alternateName`: "Zaid Qasim", "Muhammad Zaid"; `additionalName`: "Zaid"
  - `hasOccupation` (Occupation + skills + Karachi location)
  - `knowsAbout` expanded (C#, ASP.NET Core, EF, Dapper, React Native, MAUI, …)
  - `alumniOf` with `sameAs` links to NED + PAF-KIET (entity association)
  - `worksFor` with E-Creatorz URL, `nationality`
- **Title (`src/lib/seo.ts`)** — `Muhammad Zaid Qasim — .NET & Full-Stack Developer`
  (name + top role, under 60 chars).
- **Meta description** — rewritten to ~160 chars, keyword-front-loaded.
- **Keywords** — expanded to the realistic target set (role + geo + name variants).
- **Hero image alt** — now `Muhammad Zaid Qasim — .NET and full-stack software
  developer in Karachi, Pakistan` (helps Google Images for name searches).
- **Crawlable roles** — the homepage rotating text (TypingEffect) renders empty in
  server HTML, so a screen-reader/crawler-visible sentence listing every role was
  added to the hero. The role phrases now exist in the static HTML.

---

## 2. Keyword placement map

Place each keyword where it counts, once or twice, naturally:

| Location | What to put there |
|---|---|
| `<title>` | Name + primary role (done) |
| Meta description | Name + roles + stack + Karachi (done) |
| H1 (homepage) | Currently "Hi, I'm Muhammad Zaid Qasim" — consider "Muhammad Zaid Qasim — .NET & Full-Stack Developer" so the H1 itself carries the role |
| H2s | "About Muhammad Zaid Qasim", "Backend & .NET Engineering Skills", "Enterprise .NET Projects" |
| First 100 words of each page | Name + role + location |
| Image alt text | Name + role (done for hero; do the same for the About portrait) |
| URL slugs | Already clean (/about, /projects/net-2-bank) — good |
| Internal anchor text | Link "See my .NET projects", not "click here" |

**Do not** repeat the same phrase 10× — Google penalises stuffing. One natural
mention per section is enough.

---

## 3. Per-page content recommendations

Your content is already strong and keyword-rich (the bio names the full stack).
Targeted upgrades:

- **Homepage H1**: add the role to the H1 (biggest single on-page lever still open).
- **About page H2**: change "Professional Biography" → "About Muhammad Zaid Qasim —
  .NET & Full-Stack Developer". Named H2s rank for name+role.
- **Projects**: each project detail page should open with a sentence like
  "Built by Muhammad Zaid Qasim using ASP.NET Core, SQL Server and …". Right now
  the project pages are your best long-tail assets — make sure each states the
  tech stack in prose, not just tags.
- **Experience page**: include the literal job titles recruiters search — "Software
  Developer", ".NET Developer", "Resident Engineer" — as headings, which you do.
- **Add an FAQ block** (homepage or about) with `FAQPage` JSON-LD answering:
  "Who is Muhammad Zaid Qasim?", "What technologies does he use?", "Is he available
  for hire?" — FAQ rich results own extra SERP space on name searches.

### Prompt Engineer — important
You listed "Prompt Engineer" but there is **no evidence** of it on the site. Do not
claim it in schema/titles without proof — it hurts credibility and Google ignores
unsupported claims. If it's genuine, earn it: add an "AI / Prompt Engineering"
skills group, ship 1–2 LLM projects (you're building on Claude right now — that's a
real case study), and write a blog post. *Then* add it to `jobTitle`.

---

## 4. Technical SEO — current state

Your technical foundation is already **above average**:

| Item | Status |
|---|---|
| Semantic HTML, one H1/page | ✅ |
| `sitemap.xml` (dynamic) | ✅ present — add `lastModified` from real dates, not `new Date()` on every build |
| `robots.txt` | ✅ allows all, disallows /api, links sitemap |
| Canonical tags | ✅ per-page via `createPageMetadata` |
| Person + WebSite JSON-LD | ✅ now enriched |
| OG / Twitter cards | ✅ |
| Mobile responsive | ✅ |
| Page speed | ✅ Next.js SSG, next/image, font `display:swap` |
| HTTPS | ✅ Vercel |

**Gaps to close:**
- **`NEXT_PUBLIC_SITE_URL`** must be the real domain in production (or a custom
  domain) — canonicals/OG/sitemap all derive from it. Verify on Vercel.
- **Custom domain**: `muhammadzaidqasim.com` would beat `…vercel.app` for a name
  query — an exact-match domain for your name is a strong signal. ~$12/yr, high ROI.
- **Google Search Console + Bing Webmaster Tools**: verify the site, submit the
  sitemap, request indexing. Add the verification tokens to the env vars the code
  already supports (`GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`).
- **OG image**: you use the portrait. A branded 1200×630 card with name + roles
  reads better when shared. Optional.
- **`BreadcrumbList` JSON-LD** on project pages (helper exists — make sure it's used).

---

## 5. Personal-branding SEO (the highest-ROI work)

Goal: make the **entire first page** of a "Muhammad Zaid Qasim" search yours.
Every profile below is a page you control that will rank for your name — fill each
with the same title (".NET & Full-Stack Developer"), same photo, and a link back to
the portfolio. Consistency (Name-Title-Photo) across properties is what teaches
Google these are all *you*.

- **LinkedIn** — headline: ".NET & Full-Stack Developer | ASP.NET Core, SQL Server,
  React Native | Karachi". Custom URL `/in/m-zaid-qasim`. Featured section → link
  portfolio. This will usually rank #1 or #2 for your name.
- **GitHub** (`Learn-with-ZQ`) — see §6.
- **Stack Overflow** dev story, **Dev.to**, **Hashnode**, **HackerRank** (you have
  it), **Google Developer Profile**, **about.me**, **Polywork**.
- **Wikidata / Google Knowledge Panel** (long game) — once you have LinkedIn +
  GitHub + a custom domain + a couple of press/blog mentions, you can seed a
  Knowledge Panel so Google shows a name card.

---

## 6. Authority-building plan (off-page)

Rankings for anything beyond your name come from **links + activity on high-authority
domains**. In priority order:

1. **GitHub optimization** (you're a developer — this is your strongest asset):
   - Rich profile README with roles, stack, portfolio link.
   - Pin your best repos; give each a description + topics + a real README.
   - Push consistently (the green graph is a credibility signal to humans).
   - Add the portfolio URL to your profile's "website" field (a followed backlink).
2. **LinkedIn activity** — post projects/case studies weekly; each post can link the
   portfolio and rank for your name.
3. **Technical blog** — 1 post/month on Dev.to or Hashnode, cross-posted to your
   site. Topics you can already write: "Maker-Checker banking workflows in React
   Native", "Stored-procedure data access with Dapper in ASP.NET Core", "Building a
   testimonials pipeline with Next.js + Google Apps Script" (you just did this).
   Each earns a backlink + ranks for long-tail queries.
4. **Case studies** — turn your top 3 projects (Net 2 Bank, Edu-Smartz, Ebiz-Smartz)
   into detailed writeups: problem → architecture → stack → outcome/metrics.
5. **Community profiles & answers** — answer Stack Overflow questions in your stack;
   each profile link and accepted answer builds authority.
6. **Backlinks** — university alumni directory (NED/KIET), E-Creatorz team page,
   guest posts, dev newsletters, "awesome" lists your OSS fits.
7. **Open source** — even small useful repos (a Dapper helper, a MAUI component)
   with good READMEs attract stars + links and prove the skills in your schema.

---

## 7. Search-intent match

What recruiters/companies actually want to *see* when they search these terms —
and whether they land on your site at all:

- **".NET Developer" / "Backend Engineer"** — recruiters rarely Google this raw;
  they search on LinkedIn/Indeed with filters. Win by having a keyword-perfect
  **LinkedIn** profile, not by trying to rank your domain. When they *do* click a
  portfolio, they want: years of experience, stack, real shipped projects, and a
  resume. You have all four — make them scannable in the first screen.
- **Name search** — they've already got your CV and want to vet you. They expect:
  professional site, consistent photo, LinkedIn/GitHub, proof of work. Own the SERP.
- **"React Native / Mobile App Developer Karachi"** — genuine local intent, low
  competition — a dedicated, well-written Services/Experience section can rank.

---

## 8. Competitor analysis (top developer portfolios)

What the best-ranking personal dev sites do that's worth copying:

- **Exact-match domain** = their name (`.com`). → Get `muhammadzaidqasim.com`.
- **Consistent NAP/identity** across LinkedIn/GitHub/site. → §5.
- **A blog** that feeds fresh, long-tail-ranking content. → §6.3.
- **Real project case studies** with metrics, not just cards. → §6.4.
- **Backlinks** from GitHub, Dev.to, university, employer. → §6.
- **Fast, accessible, mobile-first** — you already match or beat most here.

Your design/technical quality is already better than the median dev portfolio; the
gap is purely **domain, content velocity (blog), and backlinks**.

---

## 9. Roadmap

### Immediate (0–7 days) — mostly done or quick
- [x] Enriched Person schema, title, description, keywords, alt text, crawlable roles
- [ ] Commit + redeploy so the above goes live
- [ ] Verify `NEXT_PUBLIC_SITE_URL` = production domain on Vercel
- [ ] Set up **Google Search Console** + **Bing Webmaster**, submit sitemap, request indexing
- [ ] Buy **muhammadzaidqasim.com** and point it at Vercel
- [ ] Align **LinkedIn** + **GitHub** headline/photo/portfolio-link
- [ ] Add the homepage H1 role + an FAQ section with FAQPage schema

### Medium term (1–3 months)
- [ ] Publish 3–4 blog posts / case studies (from your real projects)
- [ ] Flesh out GitHub: profile README, pinned repos, per-repo READMEs
- [ ] Get 5–10 quality backlinks (LinkedIn, Dev.to, NED alumni, E-Creatorz)
- [ ] Add per-project prose stating tech stack + your name
- [ ] Weekly LinkedIn posts linking the portfolio
- [ ] If genuine: add an AI/Prompt-Engineering skills group + 1 LLM case study

### Long term (3–12 months)
- [ ] 1 blog post/month → compounding long-tail traffic
- [ ] Sustained GitHub contributions / small OSS with good READMEs
- [ ] Answer Stack Overflow questions in your stack
- [ ] Seed a Google Knowledge Panel (Wikidata) once authority is established
- [ ] Track rankings in Search Console; double down on queries already at #5–15

---

## 10. The one-paragraph summary

Your site's technical SEO is already strong. You will **not** rank your portfolio
for generic terms like "Software Developer" — no personal site does. Instead:
**own your name** (custom domain + consistent LinkedIn/GitHub + Search Console),
**win long-tail geo queries** (".NET developer Karachi", "Muhammad Zaid Qasim .NET"),
and **build authority off-site** (GitHub, a monthly blog, backlinks, case studies).
Do that and recruiters searching your name — the search that actually matters — will
find your portfolio as the top result, with your role clearly understood by Google.

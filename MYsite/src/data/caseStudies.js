/*
 * Single source of truth for case studies — the list rows and the detail pages
 * both read from here, so a title can never disagree between the two the way it
 * did when each component carried its own copy of the array.
 *
 * `slug` drives the URL (/projects/:slug), so entries can be reordered freely
 * without breaking shared links.
 *
 * NOTE ON `year`: set to 2026 as a placeholder — the source dossier carried no
 * dates. Correct these before publishing.
 *
 * NOTE ON `image`: optional, and it is the *hover* layer, not the resting one.
 * The row always renders the typographic wordmark plate; `image` sits above it at
 * opacity 0 and fades in on hover. Omit it and the row degrades to a plate that
 * simply does not reveal anything — no layout shift either way.
 *
 * !! PLACEHOLDERS !! Every `image` below currently points at
 * /Images/case-placeholder/*, which are assets lifted from the Armory Framer
 * template purely so the hover reveal is visible while building. They are
 * licensed to that template, NOT to us. Replace all seven with our own artwork
 * before this goes anywhere public.
 *
 * NOTE ON `testimonial`: optional — `{ quote, name, role }`. The detail page
 * renders the block only when present. Deliberately absent everywhere for now
 * rather than filled with invented quotes; add real ones as they come in.
 *
 * NOTE ON `pullQuote` / `closing`: the detail page has a slot for an unattributed
 * pull-quote and a closing paragraph, matching the reference layout. The copy
 * below is drafted — each one only restates a fact already asserted in that
 * entry's own `solution` or `achievements`, so nothing new is being claimed.
 * Read them anyway before publishing; they are editorial, not extracted.
 *
 * NOTE ON `gallery`: six images, slotted 3 / 1 / 2 down the detail page (see
 * PLACEHOLDER_GALLERY). Entries fall back to the shared set; give any entry its
 * own `gallery` array to override. Fewer than six degrades cleanly — each row
 * renders only the images it actually has.
 */

/*
 * !! PLACEHOLDERS !! Same licensing caveat as the row images above — these six
 * are Armory's editorial photographs, standing in so the gallery rhythm is
 * visible. The reference desaturates the whole gallery via `filter: grayscale()`,
 * which is why mixing colour and mono sources still reads as one set.
 */
const PLACEHOLDER_GALLERY = [
  '/Images/case-placeholder/gallery/g01.webp',
  '/Images/case-placeholder/gallery/g02.webp',
  '/Images/case-placeholder/gallery/g03.webp',
  '/Images/case-placeholder/gallery/g04.webp',
  '/Images/case-placeholder/gallery/g05.webp',
  '/Images/case-placeholder/gallery/g06.webp',
];

const caseStudies = [
  {
    slug: 'luxe-commerce',
    name: 'LUXE Commerce',
    year: '2026',
    category: 'Full-stack E-commerce',
    image: '/Images/case-placeholder/placeholder-01.webp',
    pullQuote:
      'Security and test coverage were treated as domain concerns from the first commit, not retrofitted once the storefront was already live.',
    closing:
      'The result is a storefront whose payment and identity layers can be audited on their own terms — eleven middleware layers, five test tiers running in CI, and GDPR export and erasure implemented as auditable domain operations rather than manual database work.',
    summary:
      'A dark-luxury storefront on a Clean Architecture CQRS backend, with layered security and five tiers of automated testing.',
    challenge:
      'Launching a premium storefront meant meeting two demands at once: a brand-grade shopping experience, and a payments and identity layer that could withstand real scrutiny — without accumulating the technical debt that usually comes with moving quickly.',
    solution:
      'We built the backend as a strict Clean Architecture solution with CQRS through MediatR, separating domain, application and infrastructure concerns across seven projects. Authentication runs on JWT with two-factor enrolment, GDPR export and erasure are first-class operations rather than manual database work, and payment providers are pluggable so card and cash settlement share one interface. The Next.js storefront consumes the same API surface any future client would.',
    achievements: [
      'Eleven layers of security middleware covering CSRF, rate limiting, PII log masking and field-level encryption.',
      'Five distinct test layers — unit, integration, security, end-to-end and load — all running in CI.',
      'GDPR data export and erasure implemented as auditable domain operations.',
      'An OWASP Top 10 audit written against our own codebase, with every finding resolved.',
    ],
    stats: [
      { value: '7', label: 'Project solution' },
      { value: '18k', label: 'Lines of C#' },
      { value: '5', label: 'Test layers' },
      { value: '11', label: 'Security middleware' },
    ],
    stack: [
      '.NET 10',
      'MediatR CQRS',
      'EF Core',
      'PostgreSQL',
      'Redis',
      'Stripe',
      'Next.js 15',
      'Docker · CI',
    ],
    meta: {
      Industry: 'Retail & E-commerce',
      Platform: 'Web',
      Runtime: '.NET 10',
      Architecture: 'Clean Architecture · CQRS',
    },
  },
  {
    slug: 'relay',
    name: 'Relay',
    year: '2026',
    category: 'Multi-tenant Marketplace Sync',
    image: '/Images/case-placeholder/placeholder-02.webp',
    pullQuote:
      'Every tenant authenticates through its own OAuth flow, with sandbox and production kept strictly apart.',
    closing:
      'Relay maintains the catalogue on eBay without manual intervention: retry and circuit-breaker policies on every outbound call, a rate-limit handler written for eBay’s specific quotas, and thirteen tracked migrations keeping deployments predictable.',
    summary:
      'Keeps a large auto-parts catalogue in step with eBay — listings, category mapping, business policies, and orders flowing back into the ERP.',
    challenge:
      'Selling a large parts catalogue on eBay by hand does not scale. Listings drift out of sync, eBay’s taxonomy rarely lines up with an internal one, and every tenant needs its own credentials and its own sandbox before anything is allowed near production.',
    solution:
      'Relay creates and maintains listings from the source catalogue, maps internal categories onto eBay’s taxonomy, manages business policies per account, and pulls orders back into the ERP. Every tenant authenticates through its own OAuth flow with sandbox and production kept strictly apart. Each outbound call is wrapped in retry and circuit-breaker policies, plus a rate-limit handler written specifically for eBay’s quotas.',
    achievements: [
      'Per-tenant OAuth with complete sandbox and production isolation.',
      'Resilience on every outbound call: retry, circuit breaking, and a bespoke eBay rate-limit handler.',
      'A genuine xUnit and Moq test suite covering the synchronisation paths.',
      'Five health checks and thirteen tracked migrations keeping deployments predictable.',
    ],
    stats: [
      { value: '27k', label: 'Lines of code' },
      { value: '117', label: 'Commits' },
      { value: '13', label: 'EF migrations' },
      { value: '5', label: 'Health checks' },
    ],
    stack: [
      '.NET 9',
      'Blazor · Radzen',
      'EF Core 9',
      'Polly',
      'eBay APIs',
      'PostgreSQL',
      'xUnit · Moq',
    ],
    meta: {
      Industry: 'Automotive Parts',
      Platform: 'Web · Background worker',
      Runtime: '.NET 9',
      Architecture: 'Multi-tenant · Resilience policies',
    },
  },
  {
    slug: 'manifold',
    name: 'Manifold',
    year: '2026',
    category: 'Multi-tenant Integration Hub',
    image: '/Images/case-placeholder/placeholder-03.webp',
    pullQuote:
      'Supporting a tenth marketplace means adding one class, not editing a switch.',
    closing:
      'Orders reach each tenant’s ERP already invoice-ready, with every dependent record — customers, fiscal identifiers, tax treatment and a four-level geography chain from country down to municipality — resolved or created in order beforehand.',
    summary:
      'One API that ingests orders from nine marketplaces, normalises them, and writes them into each tenant’s ERP ready for invoicing.',
    challenge:
      'Nine marketplaces, nine order shapes. Each names its fields differently, carries different fiscal and tax data, and expresses addresses at a different depth — and an ERP will reject an order outright unless every record it depends on already exists.',
    solution:
      'Manifold puts a dedicated adapter behind each marketplace and dispatches to it by route, so supporting a tenth platform means adding one class rather than editing a switch. Incoming orders are normalised, then every dependent entity is resolved or created in order — customers, fiscal identifiers, tax treatment, and a four-level geography chain from country down to municipality — before the order reaches the ERP.',
    achievements: [
      'Nine marketplace adapters behind a single factory-dispatched interface.',
      'Per-tenant secrets held in a vault, with tenants discovered at runtime rather than fixed at deploy time.',
      'Fiscal and VAT identifier handling, plus full country-to-municipality address resolution.',
      'Orders that arrive in the ERP already invoice-ready, with no manual reconciliation step.',
    ],
    stats: [
      { value: '27k', label: 'Lines of code' },
      { value: '9', label: 'Marketplace adapters' },
      { value: '63', label: 'Commits' },
      { value: '3', label: 'Project solution' },
    ],
    stack: [
      '.NET 9',
      'EF Core 9',
      'PostgreSQL · Neon',
      'AWS S3',
      'FluentFTP · SFTP',
      'Vault secrets',
      'Blazor',
    ],
    meta: {
      Industry: 'Automotive Parts',
      Platform: 'API · Web',
      Runtime: '.NET 9',
      Architecture: 'Adapter · Factory dispatch',
    },
  },
  {
    slug: 'fleet-ops',
    name: 'Fleet Ops',
    year: '2026',
    category: 'Line-of-Business Web App',
    image: '/Images/case-placeholder/placeholder-04.webp',
    pullQuote:
      'An operated fleet and buy-to-sell stock share one model; what differs between them is behaviour, not structure.',
    closing:
      'Three EF Core interceptors handle the bookkeeping a user would otherwise forget — kilometre logging, issue generation and the audit trail — while soft deletes throughout mean dependent records refuse deletion rather than cascading silently.',
    summary:
      'A Blazor backoffice running an owned vehicle fleet and buy-to-sell stock from a single model, with margin calculated automatically.',
    challenge:
      'A fleet you operate and stock you intend to resell look alike on paper but behave differently — one accrues maintenance and inspections, the other accrues purchase and sale costs against a margin. Modelling them separately duplicates everything; modelling them carelessly loses the distinction entirely.',
    solution:
      'Fleet Ops holds both in one model and separates behaviour rather than structure. Maintenance, inspections and insurance track against any vehicle, while purchase and sale costs roll into an automatic margin for resale stock. Three EF Core SaveChanges interceptors handle the bookkeeping a user would otherwise forget: logging kilometres, opening issues, and writing the audit trail.',
    achievements: [
      'Three EF Core interceptors handling automatic kilometre logging, issue generation and auditing.',
      'Soft deletes throughout, with dependent records refusing deletion rather than cascading silently.',
      'Automatic margin calculation across purchase and sale costs.',
      'Hardened deployment: content security policy, account lockout, scoped login rate limiting, non-root container.',
    ],
    stats: [
      { value: '28k', label: 'Lines of code' },
      { value: '130', label: 'Files' },
      { value: '3', label: 'EF interceptors' },
      { value: '7', label: 'Milestones' },
    ],
    stack: [
      '.NET 10',
      'Blazor Server',
      'EF Core 10',
      'PostgreSQL 17',
      'Cloudflare R2',
      'ASP.NET Identity',
    ],
    meta: {
      Industry: 'Fleet & Vehicle Trade',
      Platform: 'Web',
      Runtime: '.NET 10',
      Architecture: 'Blazor Server · EF interceptors',
    },
  },
  {
    slug: 'vitalnexus',
    name: 'VitalNexus',
    year: '2026',
    category: 'Health-Tech SaaS',
    image: '/Images/case-placeholder/placeholder-05.webp',
    pullQuote:
      'The model never receives an identity — only anonymised lab values ever cross the boundary.',
    closing:
      'Protected health information sits in its own store, separate from application state, across three isolated data stores; providers still see a patient’s results over time with AI-supported commentary on the trend.',
    summary:
      'A platform for functional-medicine clinics that tracks patient labs over time, with health data isolated from the model that reads it.',
    challenge:
      'Longitudinal lab analysis is genuinely useful to a clinician and genuinely sensitive. Any AI-supported reading of patient results has to happen without protected health information ever leaving the boundary it is permitted to sit in.',
    solution:
      'VitalNexus keeps protected health information in its own database, separate from the application store, and sends only anonymised lab values to the model. Providers see a patient’s results over time with AI-supported commentary on the trend; the model never receives an identity. The platform runs Azure-native, with a Functions worker for background analysis and infrastructure defined in Bicep.',
    achievements: [
      'Protected health information isolated in a separate data store, with only anonymised values reaching the model.',
      'Three isolated data stores separating identity, health data and application state.',
      'Azure-native operation: Functions worker, Application Insights, Bicep infrastructure, DACPAC deployments.',
      'Clean layering across API, application, domain, infrastructure and workers, with unit and integration tests.',
    ],
    stats: [
      { value: '5', label: 'Backend projects' },
      { value: '200', label: 'C# files' },
      { value: '174', label: 'Commits' },
      { value: '3', label: 'Isolated data stores' },
    ],
    stack: [
      '.NET 8',
      'React · Vite',
      'Azure SQL',
      'Azure Functions',
      'EF Core',
      'Claude API',
      'Stripe',
      'Bicep IaC',
    ],
    meta: {
      Industry: 'Healthcare AI',
      Platform: 'Web',
      Runtime: '.NET 8',
      Architecture: 'Azure-native · PHI isolation',
    },
  },
  {
    slug: 'recon',
    name: 'Recon',
    year: '2026',
    category: 'Market-Intelligence Dashboard',
    image: '/Images/case-placeholder/placeholder-06.webp',
    pullQuote:
      'Precomputing the aggregations on a schedule moves the expensive work off the request path entirely.',
    closing:
      'Fifteen analytical queries across roughly 2,300 lines of SQL — multi-CTE, window functions — feed nine bespoke SVG charts, ARIA-labelled, with no charting dependency at all.',
    summary:
      'Seller scorecards, price history, sales velocity and anomaly detection — served from precomputed snapshots, every chart hand-built in SVG.',
    challenge:
      'Market analytics over a large dataset means expensive aggregations. Run them per request and the dashboard crawls; cache them naively and the numbers go stale without anyone noticing.',
    solution:
      'Recon precomputes its aggregations on a schedule into snapshot tables, so a page load reads finished numbers instead of triggering the work. The analytical queries are raw SQL — multi-CTE with window functions — because that is where the depth lives. Every chart is authored directly as SVG with ARIA labelling and no charting dependency at all.',
    achievements: [
      'Snapshot-cache pattern moving hourly precomputation off the request path entirely.',
      'Fifteen analytical queries across roughly 2,300 lines of SQL using CTEs and window functions.',
      'Nine bespoke SVG charts, ARIA-labelled, with zero charting libraries.',
      'Seller scorecards, price history, sales velocity and anomaly detection in a single view.',
    ],
    stats: [
      { value: '8.2k', label: 'Lines of code' },
      { value: '15', label: 'Analytics queries' },
      { value: '9', label: 'Bespoke charts' },
      { value: '2.3k', label: 'Lines of SQL' },
    ],
    stack: [
      '.NET 10',
      'Razor Pages',
      'Npgsql · raw SQL',
      'BackgroundService',
      'Hand-built SVG',
      'Docker',
    ],
    meta: {
      Industry: 'Market Intelligence',
      Platform: 'Web',
      Runtime: '.NET 10',
      Architecture: 'Snapshot precomputation',
    },
  },
  {
    slug: 'data-sync-framework',
    name: 'Data Sync Framework',
    year: '2026',
    category: 'ERP Integration Framework',
    image: '/Images/case-placeholder/placeholder-07.webp',
    pullQuote:
      'An ID translation map carries source keys through to target keys, so foreign keys survive the copy intact.',
    closing:
      'Eleven entity types are walked in strict dependency order and repeat runs reconcile rather than duplicate, with per-tenant vault secrets and streaming progress aggregated into a single report.',
    summary:
      'Clones and synchronises data between separate ERP tenants in strict dependency order, preserving every foreign key.',
    challenge:
      'Copying records between two ERP tenants is not a bulk insert. Eleven entity types depend on one another, identifiers differ between the systems, and running the same synchronisation twice must not duplicate a thing.',
    solution:
      'The framework walks eleven entity types in strict dependency order and threads an ID translation map forward, so each newly created record’s key is available to whatever references it next. Foreign keys survive the copy intact, repeat runs reconcile rather than duplicate, and progress streams out into an aggregated report.',
    achievements: [
      'An ID translation map carrying source keys through to target keys so foreign keys survive the copy.',
      'Eleven ordered synchronisation steps walking entities in dependency order.',
      'Idempotent runs — repeating a sync reconciles instead of duplicating.',
      'Per-tenant vault secrets with streaming progress and aggregated reporting.',
    ],
    stats: [
      { value: '5.3k', label: 'Lines of code' },
      { value: '38', label: 'Files' },
      { value: '11', label: 'Ordered steps' },
      { value: '0', label: 'Duplicates guaranteed' },
    ],
    stack: [
      '.NET 10',
      'Generic Host · DI',
      'EF Core',
      'Npgsql',
      'Cloudflare D1',
      'Vault secrets',
    ],
    meta: {
      Industry: 'ERP Integration',
      Platform: 'CLI · Background worker',
      Runtime: '.NET 10',
      Architecture: 'Dependency-ordered sync',
    },
  },
];

/* Gallery defaults are applied once here rather than repeated on every entry, so
   swapping the placeholder set for real artwork is a single edit. Both the named
   lookup and the default export read from this list — they must not diverge. */
const withDefaults = caseStudies.map((study) => ({
  ...study,
  gallery: study.gallery ?? PLACEHOLDER_GALLERY,
}));

export const getCaseStudy = (slug) => withDefaults.find((study) => study.slug === slug);

export default withDefaults;

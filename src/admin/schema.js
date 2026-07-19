// ============================================================
//  ADMIN FORM SCHEMAS
//  Declarative field definitions per content type. The generic
//  <ItemForm> renders inputs from these, and <Section> renders the
//  list. Field types:
//    text | textarea | url | image | list | boolean | number | color
//  `list` = an editable array of strings (chips / one-per-line).
// ============================================================

export const SECTIONS = [
  {
    key: "projects",
    label: "Projects",
    icon: "FolderGit2",
    titleField: "title",
    subtitleField: "company",
    imageField: "image",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image", label: "Cover image", type: "image" },
      { name: "technologies", label: "Technologies", type: "list" },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: ["", "Work", "Personal"],
      },
      { name: "company", label: "Company (if enterprise)", type: "text" },
      { name: "liveLink", label: "Live demo URL", type: "url" },
      { name: "githubLink", label: "GitHub URL", type: "url" },
      { name: "featured", label: "Featured", type: "boolean" },
      { name: "problem", label: "Case study — Problem", type: "textarea" },
      { name: "approach", label: "Case study — Approach", type: "textarea" },
      { name: "outcomes", label: "Case study — Outcomes", type: "textarea" },
      { name: "highlights", label: "Highlights", type: "list" },
    ],
  },
  {
    key: "experience",
    label: "Experience",
    icon: "Briefcase",
    titleField: "title",
    subtitleField: "company",
    fields: [
      { name: "title", label: "Role title", type: "text", required: true },
      { name: "company", label: "Company", type: "text" },
      { name: "domain", label: "Company domain (for logo)", type: "text" },
      { name: "period", label: "Period", type: "text" },
      { name: "location", label: "Location", type: "text" },
      {
        name: "tag",
        label: "Type",
        type: "select",
        options: ["Engineering", "Data", "People"],
      },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "achievements", label: "Achievements", type: "list" },
    ],
  },
  {
    key: "articles",
    label: "Articles",
    icon: "Newspaper",
    titleField: "title",
    subtitleField: "readTime",
    imageField: "image",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "excerpt", label: "Excerpt (longer)", type: "textarea" },
      { name: "points", label: "Key points", type: "list" },
      { name: "tags", label: "Tags", type: "list" },
      { name: "image", label: "Cover image", type: "image" },
      { name: "readTime", label: "Read time", type: "text" },
      { name: "date", label: "Date label", type: "text" },
      { name: "link", label: "Published URL", type: "url" },
      { name: "draft", label: "Draft (coming soon)", type: "boolean" },
    ],
  },
  {
    key: "testimonials",
    label: "Testimonials",
    icon: "Quote",
    titleField: "name",
    subtitleField: "title",
    fields: [
      { name: "quote", label: "Quote", type: "textarea", required: true },
      { name: "name", label: "Name", type: "text" },
      { name: "title", label: "Their role / company", type: "text" },
      { name: "domain", label: "Company domain (for avatar)", type: "text" },
    ],
  },
  {
    key: "certifications",
    label: "Certifications",
    icon: "Award",
    titleField: "title",
    subtitleField: "issuer",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "issuer", label: "Issuer", type: "text" },
      { name: "domain", label: "Issuer domain (for logo)", type: "text" },
      { name: "year", label: "Year", type: "text" },
      { name: "link", label: "Credential URL", type: "url" },
    ],
  },
  {
    key: "education",
    label: "Education",
    icon: "GraduationCap",
    titleField: "title",
    subtitleField: "institution",
    fields: [
      { name: "title", label: "Degree / title", type: "text", required: true },
      { name: "institution", label: "Institution", type: "text" },
      { name: "year", label: "Year", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
];

export const SECTION_BY_KEY = Object.fromEntries(
  SECTIONS.map((s) => [s.key, s])
);

// Build a blank item from a section's field list.
export function blankItem(section) {
  const obj = {};
  for (const f of section.fields) {
    if (f.type === "list") obj[f.name] = [];
    else if (f.type === "boolean") obj[f.name] = false;
    else obj[f.name] = "";
  }
  return obj;
}

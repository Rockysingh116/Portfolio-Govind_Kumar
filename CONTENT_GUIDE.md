# 📝 How to Update Your Portfolio Content

**You almost never need to touch component code.** Nearly everything the site
shows lives in ONE file:

> **`src/data/portfolio.js`**

To update your portfolio you edit that file, save, and the site updates. This
guide shows exactly how to add or change each section, with copy‑paste templates.

---

## 🚀 The 4-step flow (works for every section)

1. Open **`src/data/portfolio.js`**.
2. Find the section you want (see the map below).
3. **Copy an existing `{ ... }` block**, paste it as a new entry, and edit the text.
4. **Save.** If `npm run dev` is running you'll see it live instantly. To publish, run `npm run build`.

> 💡 **The #1 rule:** every entry ends with a comma `,` and every block is wrapped
> in `{ }`. Keep text inside `"double quotes"`. If the site ever shows a blank
> page after an edit, you almost certainly deleted a comma, quote, or bracket —
> undo your last change (Ctrl+Z) and try again.

---

## 🗺️ Where to change what

| I want to change…                        | Edit this block        |
| ---------------------------------------- | ---------------------- |
| Name, tagline, email, phone, socials, resume link | `personal`     |
| Profile photo, bio paragraphs, quick facts, traits | `about`      |
| Hero stat numbers (Years, Users, etc.)   | `stats`                |
| Skills (grouped by category)             | `skillCategories`      |
| Projects                                 | `projects`             |
| Work experience / journey                | `experience`           |
| Education                                | `education`            |
| Certifications                           | `certifications`       |
| Articles / blog posts                    | `articles`             |
| Testimonials                             | `testimonials`         |
| GitHub repo descriptions                 | `repoDescriptions`     |
| Languages you speak                      | `languages`            |

---

## ➕ Add a new PROJECT

Find `export const projects = [` and paste this as a new block inside it:

```js
  {
    title: "My New Project",
    description: "One or two sentences on what it does and why it's cool.",
    // Use a real screenshot in /public, or an Unsplash URL, or reuse image.Ecommerce etc.
    image: "https://images.unsplash.com/photo-XXXX?auto=format&fit=crop&w=1000&q=80",
    technologies: ["React", "Node.js", "MongoDB"], // shows as tags
    category: "Personal",        // "Personal" or "Work" (drives the filter chips)
    liveLink: "https://your-live-demo.com",   // leave "" if none
    githubLink: "https://github.com/you/repo", // leave "" if none
    featured: false,
    // OPTIONAL — these show in the "click for details" modal. Delete if unused:
    problem: "The problem this solved.",
    approach: "How you built it.",
    outcomes: "The result / impact.",
    highlights: [
      "Key thing one",
      "Key thing two",
    ],
  },
```

**Minimum required:** `title`, `description`, `image`, `technologies`.
Everything else is optional — delete any line you don't need.

---

## ➕ Add a new WORK EXPERIENCE

Find `export const experience = [`. Newest goes at the **top**.

```js
  {
    title: "Job Title",
    company: "Company Name",
    domain: "company.com",      // shows the company logo (falls back to initials)
    period: "Jan 2025 – Present",
    location: "City, State",
    tag: "Engineering",          // "Engineering" | "Data" | "People" (sets the badge color)
    summary: "One-line summary of the role.",
    achievements: [
      "Bullet point one.",
      "Bullet point two.",
    ],
  },
```

---

## ➕ Add a CERTIFICATION

Find `export const certifications = [`:

```js
  {
    title: "Certification Name",
    issuer: "Issuer (e.g. Coursera)",
    domain: "coursera.org",   // shows issuer logo (falls back to initials)
    year: "2025",
    link: "https://credential-url.com", // leave "" if none
  },
```

---

## ➕ Add an ARTICLE / blog post

Find `export const articles = [`:

```js
  {
    title: "My Article Title",
    summary: "Short teaser shown on the card.",
    excerpt: "A longer paragraph describing the post.", // optional
    points: [                       // optional "what you'll learn" bullets
      "Takeaway one",
      "Takeaway two",
    ],
    tags: ["React", "Performance"],
    image: "https://images.unsplash.com/photo-XXXX?auto=format&fit=crop&w=900&q=80",
    date: "Coming soon",            // or a real date like "Mar 2025"
    readTime: "6 min read",
    link: "",                        // paste the published URL here...
    draft: true,                     // ...then set this to false to mark it "live"
  },
```

> When `draft: true`, the card shows a "Draft" badge. Set `link` and
> `draft: false` when the post is published.

---

## ➕ Add a TESTIMONIAL

Find `export const testimonials = [`:

```js
  {
    quote: "What they said about working with you.",
    name: "Person's Name",
    title: "Their Role, Company",
    domain: "company.com",  // OPTIONAL — shows company logo as the avatar
  },
```

---

## ✏️ Update the SIMPLE stuff

- **Your name / tagline / email / socials / resume:** edit the `personal` block near the top.
- **Hero stats:** edit `stats` — just change the `value` numbers.
- **Bio paragraphs:** edit the `paragraphs` list inside `about`.
- **Skills:** inside `skillCategories`, add a string to any category's `skills` list, e.g. `"GraphQL"`.

---

## 🖼️ About images

Two easy options for any `image:` field:

1. **Unsplash (no download):** go to unsplash.com, open a photo, and use a URL like
   `https://images.unsplash.com/photo-ID?auto=format&fit=crop&w=1000&q=80`.
2. **Your own file:** drop the image in the **`public/`** folder and reference it
   as `"/my-photo.jpg"` (the leading slash means "the public folder").

Your **resume** works the same way: put `resume.pdf` in `public/` and the
Resume buttons already point to `/resume.pdf`.

---

## ✅ After editing — how to see it & publish

- **See changes live:** run `npm run dev` and open the URL it prints
  (usually http://localhost:5173). Saved edits appear instantly.
- **Publish:** run `npm run build`. Then deploy the generated `dist/` folder
  (e.g. push to your host — Vercel/Netlify rebuild automatically on git push).

## 🆘 If the site goes blank after an edit

It's a typo in `portfolio.js` — 99% of the time a missing comma, quote, or bracket.
Press **Ctrl+Z** to undo until it works, then re-do the edit carefully. The
terminal running `npm run dev` also prints the line number of the error.

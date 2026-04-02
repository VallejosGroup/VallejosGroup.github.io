import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const membersCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/members" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    img: z.string().optional(),
    importance: z.number(),
    website: z.string().optional(),
    github: z.string().optional(),
    twitter: z.string().optional(),
    bluesky: z.string().optional(),
    scholar: z.string().optional(),
    blog: z.string().optional(),
    linkedin: z.string().optional(),
  }),
});

const softwareCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/software" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    category: z.string().optional(),
    language: z.string().optional(),
    img: z.string().optional(),
    importance: z.number().default(100),
    website: z.string().optional(),
    github: z.string().optional(),
    documentation: z.string().optional(),
    paper: z.string().optional(),
    bioconductor: z.string().optional(),
    cran: z.string().optional(),
    pypi: z.string().optional(),
  }),
});

const alumniCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/alumni" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    img: z.string().optional(),
    importance: z.number().optional(),
    years: z.string().optional(),
    after: z.string().optional(),
    website: z.string().optional(),
    github: z.string().optional(),
    twitter: z.string().optional(),
    scholar: z.string().optional(),
    blog: z.string().optional(),
    linkedin: z.string().optional(),
  }),
});

const newsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string().optional(),
    date: z.coerce.date(),
    inline: z.boolean().optional(),
    layout: z.string().optional(), // Allow layout field but ignore it
  }),
});

const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    nav: z.boolean().optional(),
    horizontal: z.boolean().optional(),
  }),
});

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    importance: z.number().default(100),
  }),
});

export const collections = {
  members: membersCollection,
  software: softwareCollection,
  alumni: alumniCollection,
  news: newsCollection,
  pages: pagesCollection,
  projects: projectsCollection,
};

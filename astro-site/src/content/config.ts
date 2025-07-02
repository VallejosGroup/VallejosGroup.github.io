import { defineCollection, z } from 'astro:content';

const membersCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    img: z.string().optional(),
    importance: z.number(),
    website: z.string().optional(),
    github: z.string().optional(),
    twitter: z.string().optional(),
    scholar: z.string().optional(),
    blog: z.string().optional(),
    linkedin: z.string().optional(),
  }),
});

const softwareCollection = defineCollection({
  type: 'content',
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
  type: 'content',
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

export const collections = {
  'members': membersCollection,
  'software': softwareCollection,
  'alumni': alumniCollection,
};

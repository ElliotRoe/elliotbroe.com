import { defineDocumentType, makeSource } from "contentlayer/source-files"
import { organizations, skills, tags } from "./resume.config"

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
}

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
  computedFields,
}))

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
  },
  computedFields,
}))

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    icon: {
      type: "string",
      required: false,
    },
    link: {
      type: "string",
      required: false,
    },
    organization: {
      type: "enum",
      options: organizations,
      required: false,
    },
    tags: {
      type: "list",
      of: {
        type: "enum",
        options: tags,
      },
      required: true,
    },
    skills: {
      type: "list",
      of: {
        type: "enum",
        options: skills,
      },
      required: true,
    },
  },
  computedFields,
}))

export const Experience = defineDocumentType(() => ({
  name: "Experience",
  filePathPattern: `experiences/**/*.mdx`,
  contentType: "mdx",
  fields: {
    position: {
      type: "string",
      required: true,
    },
    organization: {
      type: "enum",
      options: organizations,
      required: true,
    },
    logoPath: {
      type: "string",
      required: true,
    },
    websiteLink: {
      type: "string",
      required: true,
    },
    startDate: {
      type: "string",
      required: true,
    },
    endDate: {
      type: "string",
      required: false,
    },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page, Project, Experience],
})

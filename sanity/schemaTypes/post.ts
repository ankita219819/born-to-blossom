import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      initialValue: "Admin"
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Healing", value: "Healing" },
          { title: "Spirituality", value: "Spirituality" },
          { title: "Family", value: "Family" },
          { title: "Mindfulness", value: "Mindfulness" },
          { title: "Guidance", value: "Guidance" }
        ]
      }
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for accessibility and SEO."
        })
      ]
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown on the blog list page."
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block"
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text"
            }
          ]
        }
      ]
    })
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      subtitle: "publishedAt"
    }
  }
});

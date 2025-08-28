import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  boards: defineTable({
    name: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    imageUrl: v.string(),
    orgId: v.string(),
    title: v.string(),
  })
    // 🔹 Normal index
    // Allows filtering documents directly by `orgId`
    .index("by_org", ["orgId"])

    // 🔹 Full-text search index
    // Lets you search inside `title` and also filter results by `orgId`
    .searchIndex("search_title", {
      searchField: "title",     // Field used for text search
      filterFields: ["orgId"],  // Optional filters (e.g., restrict search by orgId)
    }),
})

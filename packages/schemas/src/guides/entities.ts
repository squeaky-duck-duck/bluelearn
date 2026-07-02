import { z } from "zod"
import { slugSchema } from "./fields"
import { guideStatusSchema, guideTypeSchema, knowledgeTypeSchema } from "./enums"

export const guideBaseSchema = z.object({
  canonical_guide_id: z.uuid().nullable(),
  slug: slugSchema,
  type: guideTypeSchema.default("canonical"),
  status: guideStatusSchema.default("draft"),
  knowledge_type: knowledgeTypeSchema.default("theory"),
})

// Before hydration
export const guideEntitySchema = guideBaseSchema.extend({
  id: z.uuid(),
  guide_base_id: z.uuid(),

  current_revision_id: z.uuid().nullable(),

  author_id: z.uuid(),

  created_at: z.date(),
  updated_at: z.date(),

  tags: z.array(slugSchema), // subject slugs
  prerequisites: z.array(slugSchema), // guide slugs
})

export type GuideEntity = z.infer<typeof guideEntitySchema>

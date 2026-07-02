import { z } from "zod"

// User-facing content primitives, shared across the guide/variant/revision
// requests so a trim or length rule lives in one place.
export const titleSchema = z.string().trim().min(1).max(200)
export const summarySchema = z.string().trim().max(500)
export const bodySchema = z.string().trim()
export const changeSummarySchema = z.string().trim().max(500)

// URL handle. Lowercased, hyphen-separated alphanumeric segments only, matching
// the guide_bases_slug_lowercase DB check.
export const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)

import z from "zod";

export const formSchema = z.object({
  wordToSearch: z.string(),
  wordFrequency: z.number(),
  syllableCount: z.number(),
  rhymingType: z.string(),
  isSeseo: z.boolean(),
  isYeismo: z.boolean(),
  isEqBV: z.boolean()
})
import z from "zod";

const categorySchema = z.object({
    categoryName: z.string().min(3, "Category name is too short!").max(60, "Category name required!"),
    categoryDescription: z.string().min(3, "Category description is too short").max(200, "Category description is required!"),
    categoryThumbnailImage: z.url(1, "Category image url is invalid!")
})
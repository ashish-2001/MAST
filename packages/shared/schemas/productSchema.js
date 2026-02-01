import z from "zod";

const productValidator = z.object({
    productName: z.string().min(3, "Product name is too small").max(50, 'Product name should not be greater than 50 words!'),
    productDescription: z.string().min(3, "Product description is too small").max(200, "Product description should not be greater than 200 words!"),
    productPrice: z.number("Product price must be a number").positive("Product price must be greater than 0"),
    thumbnailImage: z.url("Product image must be a valid url"),
    productStock: z.int("Product stock must be an integer").nonnegative("Product stock can not negative!"),
    categoryId: z.string().min(1, "Category id is required!")
});

export {
    productValidator
}
import z from "zod";

const orderValidator = z.object({
    user: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid object id"),
    items: z.array(
        z.object({
            product: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid object id"),
            quantity: z.number().int().min(1),
            priceAtPurchase: z.number().positive()
        })
    ).min(1, "Order must contain at least one item!"),
    totalAmount: z.number().positive(),
    orderStatus: z.enum(["Pending", "Paid", "Shipped", "Delivered", "Cancelled"])
});

export {
    orderValidator
}
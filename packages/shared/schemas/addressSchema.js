import z from "zod";

const addressValidator = z.object({
    address: z.string().min(1, "Address is too short").max(200, "Address is too long!"),
    landmark: z.string().min(1, "Landmark is invalid").max(50, "Landmark is required!"),
    city: z.string().min(1, "City is invalid").max(50, "City is required"),
    state: z.string().min(1, "City is required").max(50, "City is invalid!"),
    pinCode: z.number()
});

export { 
    addressValidator
}
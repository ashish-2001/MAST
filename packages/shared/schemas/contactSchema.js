import z from "zod";

const contactValidator = z.object({
    name: z.string().min(1, "Name is too short").max(50, "Invalid name!"),
    email: z.string(),
    subject: z.string().min(10, "Subject is too short").max(200, "Invalid subject!"),
    message: z.string(10, "Message is too short").max(2000, "Invalid message!"),
    status: z.enum(["Pending", "Resolved"])
});

export {
    contactValidator
}
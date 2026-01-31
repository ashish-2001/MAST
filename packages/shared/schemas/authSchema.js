const signUpValidator = z.object({
    firstName: z.string().min(3, "First name should not be less than three words"),
    lastName: z.string().min(3, "Last name should not be less than three words"),
    phoneNumber: z.number().min(10, "Phone number should not be less than 10 digits").max(10, "Phone number should not be more than 10 digits"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password should not be less than 8 letters").max(16, "Password should not be more than 16 letters"),
    confirmPassword: z.string().min(8, "Confirm password should not be less than 8 letters").max(16, "Confirm password should not be more than 16 letters"),
    otp: z.string().min(6, "Otp is too short").max(6, "Otp is Invalid")
});

const signInValidator = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password is too short").max(16, "Invalid password")
});

const otpValidator = z.object({
    email: z.string().email("Invalid email address"),
    accountType: z.enum([ACCOUNT_TYPE.ADMIN, ACCOUNT_TYPE.CUSTOMER])
});

const changePassword = z.object({
    oldPassword: z.string().min(8, "Password is too short").max(16, "Invalid Password"),
    newPassword: z.string().min(8, "New password is too short").max(16, "Invalid new password"),
    confirmNewPassword: z.string(8, "Confirm new password is too short").max(16, "Confirm new password and new password does not match")
});

export {
    signUpValidator,
    signInValidator,
    otpValidator,
    changePassword
}
import * as z from "zod";
export const SignUpSchema = z.object({
    email: z.string().email({message : "Enter Valid Email"}),
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    name : z.string().min(2, {
        message : "Name must be at least 2 characters.",
    }),
    password : z.string().min(8, {message : "Password must be at least 8 characters"})
});

export const SignInSchema = z.object({
    email: z.string().email({message : "Enter Valid Email"}),
    password : z.string().min(8, {message : "Password must be at least 8 characters"})
})

export const formSchema = z.object({
    description: z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(2).max(2200),
    tags: z.string(),
  });
  
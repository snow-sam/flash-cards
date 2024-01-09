"use server"

import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { z } from 'zod'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return {error: 'Houve um problema'}
    }

    const { email, password } = validatedFields.data

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {error: 'Credenciais inválidas!'}
                default:
                    return {error: 'Houve um problema'}
            }
        }
        throw error
    }
}
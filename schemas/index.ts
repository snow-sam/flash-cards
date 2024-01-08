import { z } from 'zod'

export const LoginSchema = z.object({
    email: z.string().email("Digite um email válido"),
    password: z.string().min(1, 'Digite uma senha válida')
});

export const RegisterSchema = z.object({
    email: z.string().email("Email é obrigatório"),
    password: z.string().min(6, 'Senha deve conter mais de 6 caracteres'),
    name: z.string().min(1, 'Nome é obrigatório')
});
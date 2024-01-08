'use server'

import {z} from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma';

import { RegisterSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values)

    if (!validateFields.success){
        return {error: 'Verifique se todos os campos estão corretos'}
    }

    const {email, password, name} = validateFields.data
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email)

    if(existingUser) {
        return {error: 'Já existe uma conta com este email'}
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    })
    return {success: "Conta criada com sucesso!"}
}
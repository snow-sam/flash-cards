'use client'

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginSchema } from '@/schemas';
import { toast } from 'react-hot-toast'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { CardWrapper } from "./card-wrapper";
import { useTransition } from "react";
import { login } from "@/actions/login";


export const LoginForm = () => {

    const [isLoading, startLoading] = useTransition()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const handleSubmit = (values: any) => {
        startLoading(() => {
            login(values).then((result: any) => {
                if (result.error) toast.error(result.error)
                if (result.success) toast.success(result.success)
            })
        })
    }

    return (
        <CardWrapper
            headerLabel="Bem-vindo ao Flash Cards"
            subHeaderLabel="Teste seus conhecimentos com lágrimas"
            backButtonLabel="Registre-se aqui"
            backButtonHref="/auth/register"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className='grid gap-2'>
                        <FormField control={form.control} name='email' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='exemplo@email.com' type='email' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='password' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='******' type='password' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <Button className='mt-4 w-full' disabled={isLoading}>{isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : 'Entrar com email'}</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}


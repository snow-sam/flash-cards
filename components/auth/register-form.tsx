'use client'

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RegisterSchema } from '@/schemas';
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
import { register } from "@/actions/register";
import {toast} from "react-hot-toast";


export const RegisterForm = () => {

    const [isLoading, startLoading] = useTransition() 

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        },
    })

    const handleSubmit = (values: any) => {
        const toastID = toast.loading('Criando conta...')
        startLoading(() => {
            register(values).then((result: any)=> {
                toast.dismiss(toastID)
                if(result.error) toast.error(result.error)
                if(result.success) toast.success(result.success)
            })
        })
    }

    return (
        <CardWrapper
            headerLabel="Bem-vindo ao Flash Cards"
            subHeaderLabel="Teste seus conhecimentos com lágrimas"
            backButtonLabel="Já possui conta? Entre aqui"
            backButtonHref="/auth/login"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className='grid gap-2'>
                    <FormField control={form.control} name='name' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='Auto explicativo' type='name' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
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
                    <Button className='mt-4 w-full' disabled={isLoading}>{isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : 'Criar conta'}</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}


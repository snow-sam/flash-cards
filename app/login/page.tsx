import { UserAuthForm } from '@/components/UserAuthForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Login() {
  const session = await getServerSession()
  
  if (session){
    redirect('/')
  }
  
  return (
    <div className="lg:p-8 grid place-items-center h-[100dvh] bg-[#f9f9f8]">
      <div className="flex p-6 w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Bem-vindo ao Flash Card
          </h1>
          <p className="text-sm text-muted-foreground">
            Teste seus conhecimentos com lágrimas
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Ao continuar, você aceita os nossos<br />
          <a
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Termos de Uso
          </a>{' '}
          e{' '}
          <a
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Politicas de Privacidade
          </a>
          .
        </p>
      </div>
    </div>
  );
}

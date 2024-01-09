import { CardWrapper } from "@/components/auth/card-wrapper"

const ErrorPage = () => {
    return (
        <CardWrapper headerLabel="Parece que algo deu errado." backButtonHref="/auth/login" backButtonLabel="Voltar para a tela de login">

        </CardWrapper>
    )
} 

export default ErrorPage
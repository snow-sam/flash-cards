import { signIn } from 'next-auth/react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const Socials = () => {

    const handleClick = async (provider: 'google' | 'github') => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }

    return (
        <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" type="button" onClick={() => handleClick("google")}>
                <Icons.google className="mr-2 h-4 w-4" />
                Google
            </Button>
            <Button variant="outline" type="button" onClick={() => handleClick("github")}>
                <Icons.gitHub className="mr-2 h-4 w-4" />
                Github
            </Button>
        </div>
    )
}
import { signIn } from 'next-auth/react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

export const Socials = () => {
    return (
        <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" type="button" onClick={() => signIn("google")}>
                <Icons.google className="mr-2 h-4 w-4" />
                Google
            </Button>
            <Button variant="outline" type="button" onClick={() => signIn("github")}>
                <Icons.gitHub className="mr-2 h-4 w-4" />
                Github
            </Button>
        </div>
    )
}
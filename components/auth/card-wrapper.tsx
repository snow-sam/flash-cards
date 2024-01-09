'use client'

import Link from "next/link";
import { Socials } from "../Social";

type CardWrapperProps = {
    children: React.ReactNode,
    headerLabel: string,
    subHeaderLabel?: string,
    backButtonLabel: string,
    backButtonHref: string,
    showSocial?: boolean;
};

export const CardWrapper = ({
    children,
    headerLabel,
    subHeaderLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}: CardWrapperProps) => {
    return (
        <>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    {headerLabel}
                </h1>
                <p className="text-sm text-muted-foreground">
                    {subHeaderLabel}
                </p>
            </div>
            {children}
            {showSocial && <Socials/>}
            <Link className="px-8 text-sm text-muted-foreground underline underline-offset-4 text-center" href={backButtonHref}>{backButtonLabel}</Link>
        </>
    )
}
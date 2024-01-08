const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="lg:p-8 grid place-items-center h-[100dvh] bg-[#f9f9f8]">
            <div className="flex p-6 w-full flex-col justify-center space-y-6 sm:w-[350px]">
                {children}
            </div>
        </div >
    )
}

export default AuthLayout
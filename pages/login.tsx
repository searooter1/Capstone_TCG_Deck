import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image";

export default function Login() {
    const result = useSession()

    const session = result.data
    const status = result.status

    return (
        <main className="flex flex-col items-center justify-center min-h-screen gap-2">
            <div>{status}</div>

            {!session ? (
                <button className={"inline-flex gap-1 bg-blue-500 rounded-md px-8 pr-6 py-2 mt-1 md:text-lg text-sm font-medium text-gray-300 transition hover:bg-blue-400 hover:text-white"}
                        onClick={() => signIn("github")}>
                    Sign in with GitHub
                </button>
            ) : (
                <div>
                    {session.user?.image && (
                        <Image
                            src={session.user.image}
                            alt="Avatar"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                    )}
                    <p>Username: <b>{session.user?.name}</b></p>
                    <p>Email: <b>{session.user?.email}</b></p>
                    <button className={"inline-flex gap-1 bg-blue-500 rounded-md px-8 pr-6 py-2 mt-1 md:text-lg text-sm font-medium text-gray-300 transition hover:bg-blue-400 hover:text-white"}
                            onClick={() => signOut()}>
                        Sign out
                    </button>
                </div>
            )}
        </main>
    )
}
import { signIn, signOut, useSession } from "next-auth/react"

export default function AuthButtons() {
    const { data: session, status } = useSession()

    if (status === "loading") return null

    if (!session) {
        return <button onClick={() => signIn("github")}>Sign in with GitHub</button>
    }

    return (
        <div>
            <div>Signed in as {session.user?.email ?? session.user?.name}</div>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    )
}

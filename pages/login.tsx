import { signIn, signOut, useSession } from "next-auth/react"
import AuthButton from "@/components/AuthButton";

export default function TestAuth() {
    const { data: session, status } = useSession()
    const loading = status === "loading"

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="-mt-36 w-full max-w-md rounded-2xl border border-white/10 bg-gray-800/40 p-6 shadow-xl backdrop-blur-md">
                <div className="pb-4">
                    <h1 className="text-xl font-semibold text-white">Sign in</h1>
                    <p className="mt-1 text-sm text-gray-300">
                        Access your account to manage your decks and cards.
                    </p>
                </div>

                {!session ? (
                    <>
                        <div className="space-y-2">
                            <AuthButton provider="github" label="Continue with GitHub" disabled={loading}/>
                            <AuthButton provider="google" label="Continue with Google" disabled={loading}/>
                            <AuthButton provider="apple" label="Continue with Apple" disabled={loading}/>
                        </div>
                    </>
                ) : (
                    <div className="space-y-3">
                        <div className="rounded-lg border border-white/10 bg-gray-950/40 p-4">
                            <div className="text-sm text-gray-300">Signed in as</div>
                            <div className="mt-1 text-white">
                                <div>
                                    <b>{session.user?.name ?? "—"}</b>
                                </div>
                            </div>
                        </div>

                        <button
                            className="w-full rounded-lg px-4 py-2 text-sm font-semibold transition
                                       border cursor-pointer border-white/10
                                       bg-red-500/20 hover:bg-red-500/30 text-white"
                            onClick={() => signOut()}
                            type="button"
                        >
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"

export default function SignUpPage() {
    const router = useRouter()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            // Create the user
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            })

            const data = await res.json().catch(() => ({}))

            if (!res.ok) {
                setError(data?.error || "Signup failed")
                setLoading(false)
                return
            }

            const login = await signIn("credentials", {
                email: email.trim().toLowerCase(),
                password,
                redirect: false,
            })

            if (login?.error) {
                setError("Account created, but sign-in failed. Please try logging in.")
                setLoading(false)
                return
            }

            router.push("/")
        } catch {
            setError("Something went wrong. Please try again.")
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="-mt-36 w-full max-w-md rounded-2xl border border-white/10 bg-gray-800/40 p-6 shadow-xl backdrop-blur-md">
                <div className="pb-4">
                    <h1 className="text-xl font-semibold text-white">Create Account</h1>
                    <p className="mt-1 text-sm text-gray-300">
                        Sign up to start building and managing your decks.
                    </p>
                </div>

                <form onSubmit={handleSignup} className="space-y-3">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full rounded-lg bg-gray-900/50 border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-lg bg-gray-900/50 border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password (min 8 characters)"
                        className="w-full rounded-lg bg-gray-900/50 border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                    />

                    {error && <div className="text-sm text-red-400">{error}</div>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg px-4 py-2 text-sm font-semibold transition border border-white/10 bg-blue-500/20 hover:bg-blue-500/30 text-white disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? "Creating account" : "Create Account"}
                    </button>
                </form>

                <div className="mt-4 text-sm text-gray-400 text-center">
                    Already have an account?{" "} {/* spacing */}
                    <Link href="/login" className="text-blue-400 hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    )
}
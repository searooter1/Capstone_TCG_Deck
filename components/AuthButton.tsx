import { signIn } from "next-auth/react"

export default function AuthButton({provider, label, disabled}: {
    provider: "github" | "google" | "apple"
    label: string
    disabled?: boolean
}) {
    return (
        <button
            className={`w-full rounded-lg px-4 py-2 text-sm font-semibold transition
        border border-white/10 bg-white/5 hover:bg-white/10
        disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer`}
            disabled={disabled}
            onClick={() => signIn(provider, {callbackUrl: "/"})} //redirects to home when signing in
            type="button"
        >
            {label}
        </button>
    )
}
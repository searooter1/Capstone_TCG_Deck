import Link from "next/link"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

export default function Navbar({ links }: { links: string[] }) {
    const router = useRouter()
    const { pathname } = router
    const { data: session, status } = useSession()

    const loading = status === "loading"

    return (
        <nav className="sticky top-0 z-50 bg-gray-800/50 border-b border-white/10">
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex gap-4">
                    {links.map((link) => {
                        const href = link === "Deck AI" ? "/" : `/${link.toLowerCase()}`
                        const isActive = pathname === href

                        return (
                            <Link key={href}
                                  className={`rounded-md px-3 py-2 text-sm font-semibold text-gray-300 transition hover:bg-white/5 hover:text-white 
                                            ${isActive ? "bg-gray-950/50 text-white" : ""}`}
                                  href={href}
                                  aria-current={isActive ? "page" : undefined}
                            >
                                {link}
                            </Link>
                        )
                    })}
                </div>

                <div>
                    {loading ? null : session ? (
                        <Link
                            href="/login" //TODO change this? link replaces login button when user is logged in, should change to edit their profile or something
                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-200"
                        >
                            {session.user?.name ?? session.user?.email}
                        </Link>
                    ) : (
                        <Link href="/login" className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-200">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}
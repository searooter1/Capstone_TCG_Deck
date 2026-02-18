import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar({ links }: { links: string[] }) {
    const router = useRouter();
    const { pathname } = router;

    return (
        <nav className="sticky top-0 z-50 bg-gray-800/50 border-b border-white/10">
            <div className="flex gap-4 px-4 py-3">
                {links.map((link) => {
                    const href = link === "Deck AI" ? "/" : `/${link.toLowerCase()}`;
                    const isActive = pathname === href;

                    return (
                        <Link key={href}
                              className={`rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white 
                                        ${isActive ? "bg-gray-950/50 text-white" : ""}`} //ternary if active change colour
                              href={href}
                              aria-current={isActive ? "page" : undefined}>
                            {link}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

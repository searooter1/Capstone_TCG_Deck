import type { ReactNode } from "react";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="app-container">
            <header className="app-header">Test Header</header>
            <main className="content">{children}</main>
        </div>
    );
}

import NextAuth, { type NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/db";

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),

    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    session: { strategy: "database" },
    callbacks: {
        async session({ session, user }) {
            if (session.user) {
                (session.user as any).id = user.id;
            }
            return session
        },
    },
}

export default NextAuth(authOptions)

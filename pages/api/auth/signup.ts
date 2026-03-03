import type { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcryptjs"
import clientPromise from "@/lib/db"

type formData = {
    email?: string
    password?: string
    name?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({error: "Method not allowed"})
    }

    const dbName = process.env.MONGODB_DB

    const { email, password, name } = req.body as formData

    const cleanEmail = email?.trim().toLowerCase()

    if (!cleanEmail || !password) {
        return res.status(400).json({ error: "Email and password required" })
    }

    if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters" })
    }

    // from lib db
    const client = await clientPromise
    const db = client.db(dbName)

    // If the email already exists in db block signup
    const existing = await db.collection("users").findOne({ email: cleanEmail })
    if (existing) {
        return res.status(409).json({ error: "Email already in use" })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const user = {
        name: name?.trim() || null,
        email: cleanEmail,
        image: null,
        passwordHash,
        createdAt: new Date(),
    }

    const result = await db.collection("users").insertOne(user)

    return res.status(201).json({ ok: true, userId: result.insertedId.toString() })
}
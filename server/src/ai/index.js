


import { mockProvider } from "./mock.provider.js"
import { geminiProvider } from "./gemini.provider.js"
import dotenv from "dotenv"
dotenv.config()

export function getAiProvider() {
    const provider = process.env.AI_PROVIDER || "mock"

    return provider === "gemini" ? geminiProvider : mockProvider

}



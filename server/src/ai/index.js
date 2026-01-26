
// import { mockProvider } from "./mock.provider.js"
// import { geminiProvider } from "./gemini.provider.js"



// export const aiProvider = (() => {
//     console.log("mock", process.env.AI_PROVIDER)
//     const provider = process.env.AI_PROVIDER || "mock"

//     if (provider === "gemini") return geminiProvider
//     return mockProvider


// })()

import { mockProvider } from "./mock.provider.js"
import { geminiProvider } from "./gemini.provider.js"
import dotenv from "dotenv"
dotenv.config()

export function getAiProvider() {
    const provider = process.env.AI_PROVIDER || "mock"

    return provider === "gemini" ? geminiProvider : mockProvider

}



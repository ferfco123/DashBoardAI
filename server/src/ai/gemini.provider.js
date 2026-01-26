
import { GoogleGenerativeAI } from "@google/generative-ai"



// const genAI = new GoogleGenerativeAI(process.env.AI_API_UR)
const genAI = new GoogleGenerativeAI("AIzaSyColh9NyOJ-jtWIuV9opyOL-__CKq5u8Ms")

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
})

export const geminiProvider = {

    async generate(prompt) {
        const result = await model.generateContent(prompt)
        return result.response.text()



    }
}
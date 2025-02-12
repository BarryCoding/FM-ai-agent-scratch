import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs'
import { myAI } from './openai'

const CHEAP_MODEL = 'gpt-4o-mini' // cheap model
const LOW_TEMPERATURE = 0.1 // stable output

export const runLLM = async ({
  model = CHEAP_MODEL,
  messages,
  temperature = LOW_TEMPERATURE,
}: {
  model?: string
  messages: ChatCompletionMessageParam[]
  temperature?: number
}) => {
  const response = await myAI.chat.completions.create({
    model,
    messages,
    temperature,
  })

  return response.choices[0].message
}

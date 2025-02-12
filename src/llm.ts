import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs'
import { getUserMessageFormCLI } from './getUserMessage'
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

export const runOneOffLLM = async () => {
  const userMessage = getUserMessageFormCLI()
  const response = await runLLM({ messages: [userMessage] })
  console.log(response)
}

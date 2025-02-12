import { addMessagesToDb, getMessagesFromDb } from './chatMemory'
import { getUserMessageFormCLI } from './getUserMessage'
import { runLLM } from './llm'
import { logMessage, showLoader } from './ui'

import { zodFunction } from 'openai/helpers/zod'
import { z } from 'zod'

const GetWeatherParameters = z.object({
  location: z.string().describe('City and country e.g. Bogotá, Colombia, Makati'),
})
const weatherTool = zodFunction({
  name: 'getWeather',
  description: 'Retrieves current weather for the given location.',
  parameters: GetWeatherParameters,
})
const initialTools = [weatherTool]

export const runAgent = async () => {
  const userMessage = getUserMessageFormCLI()
  const loader = showLoader('🤖 Thinking...')

  const messagesInMemory = await getMessagesFromDb()
  const messageFromAI = await runLLM({
    messages: [...messagesInMemory, userMessage],
    tools: initialTools,
  })

  await addMessagesToDb([userMessage, messageFromAI])
  logMessage(messageFromAI)
  loader.stop()
  // return getMessages()
}

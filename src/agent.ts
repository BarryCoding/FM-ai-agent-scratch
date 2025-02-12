import { addMessagesToDb, getMessagesFromDb } from './chatMemory'
import { getUserMessageFormCLI } from './getUserMessage'
import { runLLM } from './llm'
import { logMessage, showLoader } from './ui'

import { zodFunction } from 'openai/helpers/zod'
import { z } from 'zod'
import { runTool } from './toolRunner'

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
  logMessage(messageFromAI)

  await addMessagesToDb([userMessage, messageFromAI])

  if (messageFromAI.tool_calls) {
    const toolCall = messageFromAI.tool_calls[0]
    loader.update(`executing: ${toolCall.function.name}`)
    const toolContent = await runTool(toolCall)
    const toolMessage = {
      role: 'tool',
      content: toolContent,
      tool_call_id: toolCall.id,
    } as const
    await addMessagesToDb([toolMessage])
    loader.update(`executed: ${toolCall.function.name}`)
  }

  loader.stop()
  // return getMessages()
}

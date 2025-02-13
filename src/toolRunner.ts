import type OpenAI from 'openai'
import { zodFunction } from 'openai/helpers/zod'
import { z } from 'zod'

// can be anything from APIs, other agent response, etc.
const getWeather = (...args: any[]) => 'very cold. 17deg in Makati'

const GetWeatherParameters = z.object({
  location: z.string().describe('City and country e.g. Bogotá, Colombia, Makati'),
})
const weatherTool = zodFunction({
  name: 'getWeather',
  description: 'Retrieves current weather for the given location.',
  parameters: GetWeatherParameters,
})

export const initialTools = [weatherTool]

export const runTool = async (messageToolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall) => {
  const input = {
    toolArgs: JSON.parse(messageToolCall.function.arguments),
    otherParams: 'it can be anything or user prompts',
  }
  switch (messageToolCall.function.name) {
    case 'getWeather':
      return getWeather(input)
    default:
      throw new Error(`Unknown tool: ${messageToolCall.function.name}`)
  }
}

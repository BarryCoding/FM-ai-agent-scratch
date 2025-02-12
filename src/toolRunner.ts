import type OpenAI from 'openai'

// can be anything from APIs, other agent response, etc.
const getWeather = (...args: any[]) => 'very cold. 17deg in Makati'

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

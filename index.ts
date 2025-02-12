import { getUserMessageFormCLI } from './src/getUserMessage'
import { runLLM } from './src/llm'

const userMessage = getUserMessageFormCLI()

const response = await runLLM({
  messages: [{ role: 'user', content: userMessage }],
})

console.log(response)

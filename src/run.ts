import { chatWithMemory } from './chatMemory'
import { runOneOffLLM } from './llm'

type ProgramTypes = 'chat' | 'one-off'

export const run = (type: ProgramTypes) => {
  switch (type) {
    case 'one-off':
      runOneOffLLM()
      break
    case 'chat':
      chatWithMemory()
      break
    default:
      console.error('Invalid programType type')
      process.exit(1)
  }
}

// bun start "userMessage"
export const getUserMessageFormCLI = () => {
  const userMessage = process.argv[2]
  if (!userMessage) {
    console.error('Please provide a message')
    process.exit(1)
  }
  return userMessage
}

# my-agent-scratch

## initial project from scratch

```bash
bun init -y

git init

touch .env .env.example
```

- go to [your OpenAI dashboard](https://platform.openai.com/settings/organization/api-keys) and get/create your API key
- follow the .env.example to add your API key in your .env file(stay safe)

## run LLM

```bash
bun add openai

mkdir src
touch src/openai.ts src/llm.ts src/getUserMessage.ts
```

- openai.ts
  - OpenAI client configuration
- llm.ts
  - Configurable model and temperature settings
  - Basic chat completion functionality
- getUserMessage.ts
  - Command-line interface for user input
  - Error handling for missing user input
- create scripts `bun start` in package.json
  - run app in the terminal with `bun start "your message"`
  - "your message" must be in quotes as one argument

```bash
bun start # ✅ healthy error 🔴 triggered

bun start "hi, my name is bun" # ✅ receive response
bun start "who am I?" # ✅ receive response, but forget my name!
```

## chat with memory

```bash
bun add uuid lowdb

touch src/chatMemory.ts
```

- Project Structure
  - Added necessary dependencies (openai, lowdb, uuid)
  - Organized code into modular components
- Chat Memory Implementation
  - ⭐️ Added chat memory functionality using lowdb for persistent storage
  - Created a database structure in `db.json`
  - Implemented message history tracking with metadata (ID and timestamps)

## ai agent

```bash
bun add ora zod

bun start "what is the weather in Makati today?"

bun start "haha"
# error: 400 An assistant message with 'tool_calls' must be followed by tool messages responding to each 'tool_call_id'.

rm db.json # clear chat history
```

1. Added new UI components:
   - Created `ui.ts` with loading spinner and message logging functionality
   - Implemented colored console output for different message types
   - Added support for tool calls visualization
2. Dependencies:
   - Added ora for terminal spinners
   - Added zod for schema validation
3. Updated core functionality:
   - Modified `llm.ts` to support tool calls
   - Added agent mode in `run.ts`
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
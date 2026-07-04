+++
title = 'On AI: The annoying part with TS any'
date = '2026-01-20'
slug = 'linkedin-ai-generated-code-introduces-technical-debt-and-bugs'
original_url = 'https://www.linkedin.com/posts/williamong9923_ai-helps-me-move-faster-but-its-also-making-activity-7419204749562073091-D8im'
+++

*Originally published on [LinkedIn](https://www.linkedin.com/posts/williamong9923_ai-helps-me-move-faster-but-its-also-making-activity-7419204749562073091-D8im).*

While AI helps me move faster than ever, but it’s also making it easier for me to ship technical debt and bugs. 

Lately, I’ve been using agentic code generation (opencode) for frontend tasks. 

It’s satisfying to see results immediately, but I’ve noticed a recurring patterns where it keep trying to use `any` for defining types. When building in an existing codebase, i observed that LLMs often try to take the path of least resistance.

They default to any or unknown. It compiles. It works. The task is "done." By letting the AI use "any" frequently, it also quietly kills the reason we use TypeScript in the first place:

1. The LSP in my IDE stops helping me.

2. I end up manually tracing the types of the function and return types anyway.

3. The "speed" I gained today on building in the codebase could possibly be the reason of a bug report next month.

To combat it, I’ve started following more preventive rule with my AI prompts:

1. I prompt the AI to define the Interface/Type before writing the logic. 

2. I referenced the existing type definitions directly into the prompt so it doesn't have to guess / find it themself 

Not saying that `any` is not useful, as it is still useful for building generic functions or utilities.

The things is, I want it to be a human choice (after deciding the tradeoff), not to be used as an AI shortcut.

{{< figure src="/images/typescript-meme.jpeg" alt="typescript any" width="400" >}}

ps: Interestingly, I don't see this as often when I'm working in Go. Perhaps because Go is strictly static, the AI is forced to respect the types. 

But in TypeScript, that "flexibility" becomes a weakness when an AI is driving. Have you noticed your AI assistants getting "lazy" with types on your codebase ? How are you keeping your codebase clean ?

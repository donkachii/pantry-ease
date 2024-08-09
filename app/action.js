"use server";

import { createStreamableValue } from "ai/rsc";
import { streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export async function continueConversation(messages) {
  const result = await streamText({
    model: "meta-llama/llama-3.1-8b-instruct:free",
    messages,
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}

// https://openrouter.ai/api/v1/chat/completions

const openrouter = createOpenRouter({
  apiKey: process.env.NEXT_PUBLIC_OPEN_ROUTER_API_KEY,
});

export async function generate(input) {
  const stream = createStreamableValue("");

  (async () => {
    try {
      const { textStream } = await streamText({
        model: openrouter("meta-llama/llama-3.1-8b-instruct:free"),
        prompt: input,
      });

      for await (const delta of textStream) {
        stream.update(delta);
      }

      stream.done();
    } catch (error) {
      console.error("Error generating text:", error);
    }
  })();

  return { output: stream.value };
}

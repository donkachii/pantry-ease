import { openai } from "@ai-sdk/openai";
import { streamText, StreamData } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req) {
  const { messages } = await req.json();

  const data = new StreamData();
  data.append({ test: "value" });

  const result = await streamText({
    model: "meta-llama/llama-3.1-8b-instruct:free",
    onFinish() {
      data.close();
    },
    messages,
  });

  return result.toDataStreamResponse({ data });
}

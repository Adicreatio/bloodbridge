import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from 'ai'

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const systemPrompt = `You are BloodBridge, a helpful assistant for India's blood donor network. You help users:
- Register as a blood donor by explaining the process and required information
- Find blood donors in their state and city
- Understand blood types and donation safety
- Answer questions about the blood donation process
- Provide guidance on eligibility to donate

You have knowledge of all 36 Indian states and UTs, and 500+ major cities across India.
When users ask about registering, guide them to fill out their blood group, city, and state.
When users ask about finding donors, explain how to use the search feature with filters for blood group, state, and city.
Always encourage blood donation as a life-saving act of "Seva" (service).
Be empathetic, informative, and supportive. Keep responses concise and helpful.`

  const result = streamText({
    model: 'openai/gpt-5',
    system: systemPrompt,
    // Note: convertToModelMessages is async in version 6
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    // Pass original messages for persistence - onFinish receives complete history
    originalMessages: messages,
    onFinish: async ({ messages: allMessages, isAborted }) => {
      if (isAborted) return
      // allMessages includes the new AI response as UIMessage[]
      // await saveChat({ chatId, messages: allMessages })
    },
    consumeSseStream: consumeStream,
  })
}

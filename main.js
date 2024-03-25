import 'dotenv/config';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chatCompletion = await openai.chat.completions.create({
  messages: [
    {
      role: 'system',
      content: `Du bist ein Experte in JavaScript, der dabei hilft, die Sprache zu erlernen.`,
      role: 'user',
      content: `Erkläre mir Arrays.`,
    },
  ],
  model: 'gpt-4-turbo-preview',
});

console.log(chatCompletion.choices[0].message.content);

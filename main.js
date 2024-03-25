import 'dotenv/config';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let input = null;
// check if prompt given on command line
if (process.argv.length > 2) {
  input = process.argv[2];
} else {
  // no prompt given
  console.error(
    `Dein Prompt fehlt. Gib ihn so im Programmaufruf an:
        node main.js 'Mein Prompt ist hier.' `
  );
  process.exit();
}

const chatCompletion = await openai.chat.completions.create({
  messages: [
    {
      role: 'system',
      content: `Du bist ein Experte in JavaScript, der dabei hilft, die Sprache zu erlernen.`,
      role: 'user',
      content: input, // prompt given on command line
    },
  ],
  model: 'gpt-4-turbo-preview',
});

console.log(chatCompletion.choices[0].message.content);

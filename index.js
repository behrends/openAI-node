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
        npm start 'Mein Prompt ist hier.' `
  );
  process.exit();
}

const chatStream = await openai.chat.completions.create({
  messages: [
    {
      role: 'system',
      content:
        'Benutze Piratensprache und sprich, als wärst du ein Pirat von den hohen Meeren.',
    },
    {
      role: 'user',
      content: input, // prompt given on command line
    },
  ],
  model: 'gpt-4o',
  stream: true,
});

for await (const chunk of chatStream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}

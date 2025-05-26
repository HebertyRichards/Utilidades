const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function gerarComentarioIA(mensagem) {
  const texto = JSON.stringify(mensagem, null, 2);
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você é um analista de dados e deve gerar um comentário útil e objetivo com base nos dados a seguir.",
      },
      { role: "user", content: texto },
    ],
  });

  return response.choices[0].message.content;
}

module.exports = { gerarComentarioIA };

# 🛠️ HR Utilities - Gerador de QR Code e Conversor de Excel para PDF com Relatório via OpenAI

Este projeto reúne duas funcionalidades essenciais para automação de processos:

1. ✅ **Gerador de QR Code:** converta qualquer caractere, texto ou link em um QR Code, com possibilidade de download em **formato PNG**.
2. ✅ **Conversor de Excel para PDF:** faça upload de uma planilha Excel ou CSV, gere automaticamente um **PDF** e obtenha um **relatório textual inteligente** usando a **API da OpenAI**.

---

## 🚀 Funcionalidades

### ✅ 1. Gerador de QR Code
- Transforme textos, links ou caracteres em QR Codes rapidamente.
- Download do QR Code em **PNG**.
- Implementado com **Vue.js** para uma experiência dinâmica e responsiva.

### ✅ 2. Conversor de Excel para PDF com Relatório via OpenAI
- Upload de arquivos `.xlsx` ou `.csv`.
- Conversão automática em **PDF**.
- **Geração de relatório textual** com base nos dados, utilizando **inteligência artificial** via OpenAI.
- Ideal para relatórios automatizados e profissionais.

---

## 🛠️ Tecnologias e Bibliotecas Utilizadas

### 🔵 Frontend (Vue.js)
- `vue-qrcode` – Geração de QR Codes.
- `file-saver` – Download de imagens PNG.
- `axios` – Comunicação com a API backend.

### 🟢 Backend (Node.js + Express.js)
- `express` – Estrutura de rotas e servidor backend.
- `multer` – Upload de arquivos.
- `xlsx` e `sheetjs` – Manipulação e leitura de arquivos Excel.
- `csv-parse` – Conversão de arquivos `.csv` para objetos manipuláveis.
- `pdfkit` ou `puppeteer` – Geração de arquivos PDF.
- `openai` – Integração com a API da OpenAI para geração de relatórios inteligentes.
- `consign` – Organização e carregamento automático de módulos.
- `ejs` – Template engine para renderização de views dinâmicas.
- `qrcode` – Geração de QR Codes no backend, se necessário.
- `cors` – Habilitação de comunicação segura entre frontend e backend.

---

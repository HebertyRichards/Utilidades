const { gerarComentarioIA } = require("../services/aiService");
const { tableHTML } = require("../utils/tableHTML");
const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");
const { XMLParser } = require("fast-xml-parser");
const { parse } = require("csv-parse/sync");
const ejs = require("ejs");
const puppeteer = require("puppeteer");

async function convertFile(req, res) {
  const tmp = req.file?.path;
  if (!tmp) {
    return res.status(400).json({ error: "Nenhum arquivo recebido." });
  }

  try {
    const ext = path.extname(req.file.originalname).toLowerCase();
    let rows = [];

    switch (ext) {
      case ".xlsx":
      case ".xls": {
        const wb = xlsx.readFile(tmp);
        const ws = wb.Sheets[wb.SheetNames[0]];
        rows = xlsx.utils.sheet_to_json(ws, { defval: "" });
        break;
      }
      case ".csv": {
        const csv = fs.readFileSync(tmp, "utf8");
        rows = parse(csv, { columns: true, skip_empty_lines: true });
        break;
      }
      case ".xml": {
        const xml = fs.readFileSync(tmp, "utf8");
        const obj = new XMLParser({ ignoreAttributes: false }).parse(xml);
        const itemsKey = Object.keys(obj)[0];
        rows = Array.isArray(obj[itemsKey]) ? obj[itemsKey] : [obj[itemsKey]];
        break;
      }
      case ".pbix":
      case ".pbit":
        return res.status(415).json({
          error: "PBIX/PBIT não suportado.",
        });
      default:
        return res.status(415).json({
          error: "Tipo de arquivo não suportado.",
        });
    }

    if (!rows.length) {
      return res
        .status(400)
        .json({ error: "Nenhum dado encontrado no arquivo." });
    }

    const comentarioIA = await gerarComentarioIA(rows);

    const templatePath = path.join(__dirname, "..", "templates", "base.ejs");
    if (!fs.existsSync(templatePath)) {
      return res
        .status(500)
        .json({ error: "Template do relatório não encontrado." });
    }

    const html = await ejs.renderFile(templatePath, {
      table: tableHTML(rows),
      comentario: comentarioIA,
    });

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "domcontentloaded" });
    const pdf = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="relatorio.pdf"',
    });
    res.send(pdf);
  } catch (err) {
    res.status(500).json({
      error: "Falha ao converter arquivo",
      message: err.message,
      stack: err.stack,
    });
  } finally {
    if (tmp && fs.existsSync(tmp)) {
      try {
        fs.unlinkSync(tmp);
      } catch (unlinkErr) {
        console.error("[ERRO] Falha ao apagar arquivo temporário:", unlinkErr);
      }
    }
  }
}

module.exports = { convertFile };

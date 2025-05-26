module.exports = {
  tableHTML: function (rows) {
    if (!rows || !rows.length) {
      return "<p>Sem dados para exibir.</p>";
    }

    const cols = Object.keys(rows[0]);
    const header = cols.map((col) => `<th>${col}</th>`).join("");

    const body = rows
      .map((row) => {
        const cells = cols.map((col) => `<td>${row[col]}</td>`).join("");
        return `<tr>${cells}</tr>`;
      })
      .join("");

    return `<table border="1"><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table>`;
  },
};

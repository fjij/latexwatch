import latex from "node-latex";
import fs from "fs-extra";

export function compileLatex(texPath: string, pdfPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const input = fs.createReadStream(texPath);
    const output = fs.createWriteStream(pdfPath);
    const pdf = latex(input);
    pdf.pipe(output);
    pdf.on("error", (e) => reject(e));
    pdf.on("finish", () => resolve());
  });
}

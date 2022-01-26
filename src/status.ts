import colors from "colors/safe";

const data: {
  texDir: string,
  pdfDir: string,
  map: {
    [key: string]: string;
  };
} = { map: {}, texDir: "", pdfDir: "" };

function render() {
  console.clear();
  console.log(`${colors.blue("latexwatch")} ${data.texDir} -> ${data.pdfDir}`);
  Object.keys(data.map).sort().forEach((key) => console.log(data.map[key]));
}

export function setTexDir(texDir: string) {
  data.texDir = texDir;
  render();
}

export function setPdfDir(pdfDir: string) {
  data.pdfDir = pdfDir;
  render();
}

export function deleteStatus(key: string) {
  delete data.map[key];
  render();
}

type StatusTag = "COMPILING" | "ERROR" | "OK";

function colorTag(tag: StatusTag) {
  const boxedTag = `[${tag}]`;
  if (tag === "OK") {
    return colors.green(boxedTag);
  }
  if (tag === "ERROR") {
    return colors.red(boxedTag);
  }
  return colors.gray(boxedTag);
}

export function updateStatus(key: string, tag: StatusTag, message: string) {
  data.map[key] = `${colorTag(tag)} ${message}`;
  render();
}

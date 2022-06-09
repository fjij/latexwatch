#!/usr/bin/env node
import chokidar from "chokidar";
import path from "path";
import fs from "fs-extra";
import { deleteStatus, updateStatus, setPdfDir, setTexDir } from "./status";
import { executeCommand } from "./process";
import { getConfig } from "./config";

const { src, target, command } = getConfig();

setTexDir(src);
setPdfDir(target);

const ext = ".tex";

const glob = path.join(src, "**", `*${ext}`);

const watcher = chokidar.watch(glob);

function getPdfPath(texPath: string) {
  const relative = path.relative(
    src,
    path.join(
      path.dirname(texPath),
      path.basename(texPath, path.extname(texPath)),
    ),
  );
  return `${path.join(target, relative)}.pdf`;
}

function onlyTex(fn: (texPath: string) => void) {
  return (filePath: string) => {
    if (path.extname(filePath) !== ext) {
      return;
    }
    fn(filePath);
  };
}

async function onUpdate(texPath: string) {
  updateStatus(texPath, "COMPILING", texPath);
  const pdfPath = getPdfPath(texPath);
  fs.mkdirpSync(path.dirname(pdfPath));
  try {
    await executeCommand(command, texPath, pdfPath);
    updateStatus(texPath, "OK", `${texPath} -> ${pdfPath}`);
  } catch (e) {
    const err = e as Error;
    updateStatus(texPath, "ERROR", `${texPath}\n${err.message}`);
  }
}

function deleteEmptyRecursive(dir: string) {
  const relative = path.relative(target, dir);
  if (relative && !relative.startsWith('..') && !path.isAbsolute(relative)) {
    try {
      fs.rmdirSync(dir);
      deleteEmptyRecursive(path.dirname(dir));
    } finally {}
  }
}

function onDelete(texPath: string) {
  deleteStatus(texPath);
  const pdfPath = getPdfPath(texPath);
  fs.unlinkSync(pdfPath);
  deleteEmptyRecursive(path.dirname(pdfPath));
}

watcher.on("add", onlyTex(onUpdate));
watcher.on("change", onlyTex(onUpdate));
watcher.on("unlink", onlyTex(onDelete));

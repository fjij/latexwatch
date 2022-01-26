import commandLineArgs from "command-line-args";
import isValidPath from "is-valid-path";
import { printHelp } from "./help";

function assertPath(name: string) {
  return (p: string): string => {
    if (!isValidPath(p)) {
      console.error(`invalid ${name}: ${p}`);
      process.exit(1);
    }
    return p;
  }
}

interface Config {
  src: string;
  target: string;
};

export function getConfig(): Config {
  try {
  const { src, target, help } = commandLineArgs([
    { name: "src", defaultValue: ".", type: assertPath("src") },
    { name: "target", defaultValue: ".", type: assertPath("target") },
    { name: "help", type: Boolean },
  ]);
  if (help) {
    printHelp();
    process.exit(0);
  }
  return { src, target };
  } catch(e) {
    const err = e as Error;
    console.error(err.message);
    process.exit(1);
  }
}


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
  command: string;
};

export function getConfig(): Config {
  try {
    const { src, target, help, command } = commandLineArgs([
      { name: "src", defaultValue: ".", type: assertPath("src") },
      { name: "target", defaultValue: ".", type: assertPath("target") },
      { name: "command", defaultOption: true, type: String },
      { name: "help", type: Boolean },
    ]);
    if (help) {
      printHelp();
      process.exit(0);
    }
    if (!command) {
      throw new Error("missing command string");
    }
    return { src, target, command };
  } catch(e) {
    const err = e as Error;
    console.error(err.message);
    process.exit(1);
  }
}


import { spawn } from "child_process";
import format from "string-template";


const command = "pandoc -s -i {0} -o {1}";

export function executeCommand(
  command: string,
  inputPath: string,
  outputPath: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const [name, ...args] = format(
      command,
      [`${inputPath}`, `${outputPath}`],
    ).split(" ");
    console.log(name, args);
    const p = spawn(name, args);
    let log = "";
    p.stdout.on("data", (data) => log += data);
    p.stderr.on("data", (data) => log += data);
    p.on("error", (error) => reject(error));
    p.on("close", (code) => {
      if (code !== 0) {
        throw new Error(log);
      }
      resolve();
    });

  });
}

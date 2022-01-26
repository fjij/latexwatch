import commandLineUsage from "command-line-usage";

export function printHelp() {
  console.log(commandLineUsage([
    {
      header: "latexwatch",
      content: "Watch a directory for .tex files and compile them to .pdf"
    },
    {
      header: 'Options',
      optionList: [
        {
          name: "src",
          typeLabel: '{underline directory}',
          description: "The directory to watch for .tex files.",
          defaultValue: ".",
        },
        {
          name: "target",
          typeLabel: '{underline directory}',
          description: "The directory to output .pdf files.",
          defaultValue: ".",
        },
        {
          name: "help",
          description: "Print this message.",
          type: Boolean,
        }
      ]
    }
  ]));
}

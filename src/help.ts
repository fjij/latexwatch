import commandLineUsage from "command-line-usage";

export function printHelp() {
  console.log(commandLineUsage([
    {
      header: "latexwatch",
      content: "Map files from a watched directory to a target directory"
    },
    {
      header: 'Options',
      optionList: [
        {
          name: "command",
          type: String,
          description: "The command to execute -- use {0} and {1} as source and target files.",
          defaultOption: true,
        },
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

# latexwatch

Watch a directory for `.tex` files and compile them to `.pdf`

# Installation

```sh
npm install -g latexwatch
```

# Example Usage

Current directory
```sh
latexwatch
```

Separate `.tex` and `.pdf` directory
```sh
latexwatch --src ./docs --target ./build
```

# Options

`--src`: The directory to watch for .tex files. 

`--target`: The directory to output .pdf files.    

`--help`: Print the help message.

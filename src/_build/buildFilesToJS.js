import { mkdir, readdir, readFile, rm, writeFile } from "fs/promises";
import path from "path";

// Generic function to get all files of a specific extension
async function getAllFiles(directory, fileExtension) {
  const allFiles = [];

  async function scan(dir) {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await scan(fullPath);
      } else if (entry.isFile() && path.extname(entry.name) === "." + fileExtension) {
        allFiles.push(fullPath);
      }
    }
  }

  await scan(directory);
  return allFiles;
}

// Main function to build files into JS modules
export async function buildFilesToJS(srcDir, outputDir, fileExtension, minification = false, placeholder = false, logError = false) {
  try {
    console.log(`Building files from '${srcDir}' with extension '${fileExtension}'...`);

    // Get all files with the given extension
    const allFiles = await getAllFiles(srcDir, fileExtension);

    if (allFiles.length === 0) {
      logError && console.error(`No files with extension '${fileExtension}' found in directory: ${srcDir}`);
      return;
    }

    // Remove and recreate output directory
    await rm(outputDir, { recursive: true, force: true });
    await mkdir(outputDir, { recursive: true });

    // Process each file
    for (const filePath of allFiles) {
      let fileContent = await readFile(filePath, "utf-8");

      if (placeholder) {
        fileContent = "...";
      } else {
        let cleanContent = fileContent.split("\n");

        if (minification) {
          cleanContent = cleanContent
            .map((line) =>
              line.replace(/\s{2,}/g, "")               // Remove double spaces
                .replace(/\/\/(?![^"]*["']).*/g, "")    // Remove JS inline comment (// ...)
                .replace(/\/\*[\s\S]*?\*\//g, "")       // Remove JS/CSS multiline comment (/* ... */)
                .replace(/\s*{\s*/g, "{")               // Replace " {" with "{"
                .replace(/\s*:\s*/g, ":")               // Replace ": " with ":"
                .replace(/\s*!/g, "!")                  // Replace " !" with "!"
            )
            .filter((line) =>
              line.trim() &&
              !line.trim().startsWith("logConsole &&") &&
              !line.trim().startsWith("logError &&")
            );
        }

        const lineBreak = minification ? "" : "\n";
        cleanContent = cleanContent.join(lineBreak);
        fileContent = cleanContent;
      }

      const filename = path.basename(filePath, path.extname(filePath));
      const jsContent = `export const ${filename.replace("-", "_")} = \`${fileContent}\`;`;
      const jsFilePath = path.join(outputDir, `${filename}.js`);

      await writeFile(jsFilePath, jsContent, "utf-8");
      console.log(`Built ${filename}.js at ${jsFilePath}`);
    }

    console.log(`\nBuild completed successfully for '${srcDir}' -> '${outputDir}'!`);
  } catch (error) {
    logError && console.error("Error during build:", error);
    process.exit(1);
  }
}

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
      } else if (entry.isFile() && path.extname(entry.name) === fileExtension) {
        allFiles.push(fullPath);
      }
    }
  }

  await scan(directory);
  return allFiles;
}

// Main function to build files into JS modules
export async function buildFilesToJS(srcDir, outputDir, fileExtension) {
  try {
    console.log(`Building files from '${srcDir}' with extension '${fileExtension}'...`);

    // Get all files with the given extension
    const allFiles = await getAllFiles(srcDir, fileExtension);

    if (allFiles.length === 0) {
      console.error(`No files with extension '${fileExtension}' found in directory: ${srcDir}`);
      return;
    }

    // Remove and recreate output directory
    await rm(outputDir, { recursive: true, force: true });
    await mkdir(outputDir, { recursive: true });

    // Process each file
    for (const filePath of allFiles) {
      const fileContent = await readFile(filePath, "utf-8");

      // Remove comments and empty lines
      const cleanContent = fileContent
        .split("\n")
        .filter((line) => line.trim() && !line.trim().startsWith("//") && !line.trim().startsWith("/*"))
        .join("\n");

      const filename = path.basename(filePath, path.extname(filePath));
      const jsContent = `export const ${filename} = \`${cleanContent}\`;`;
      const jsFilePath = path.join(outputDir, `${filename}.js`);

      await writeFile(jsFilePath, jsContent, "utf-8");
      console.log(`Built ${filename}.js at ${jsFilePath}`);
    }

    console.log(`\nBuild completed successfully for '${srcDir}' -> '${outputDir}'!`);
  } catch (error) {
    console.error("Error during build:", error);
    process.exit(1);
  }
}
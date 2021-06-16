import env from "dotenv";
env.config();

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;
import { downloadDirectory, uploadDirectory } from "./fileManager";

const upload = argv["upload"];
const download = argv["download"];
const from = argv["from"];

const showHelp = () => {
  console.log(`
    Telegram Cloud Storage - Help
    Options:
        Upload:     npm start -- --upload="folder_name"
        Download:   npm start -- --download="folder_name" --from="docs.json"
    `);
};

if (!upload && !download) {
  showHelp();
} else {
  if (upload) {
    uploadDirectory(upload);
  } else if (download) {
    if (!from) {
      console.log(
        "No docs.json file specified, trying to fetch details from 'docs.json' file"
      );
    }
    downloadDirectory(from || "docs.json", download);
  }
}

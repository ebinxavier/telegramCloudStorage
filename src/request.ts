import request from "request";
import fs from "fs";
import cliProgress from "cli-progress";

export const download = (url, filename) => {
  return new Promise((resolve, reject) => {
    const callback = (msg) => {
      reject(msg);
    };
    const progressBar = new cliProgress.SingleBar(
      {
        format: "{bar} {percentage}% | ETA: {eta}s",
      },
      cliProgress.Presets.shades_classic
    );

    const file = fs.createWriteStream(filename);
    let receivedBytes = 0;

    request
      .get(url)
      .on("response", (response) => {
        if (response.statusCode !== 200) {
          return callback("Response status was " + response.statusCode);
        }

        const totalBytes = response.headers["content-length"];
        progressBar.start(totalBytes, 0);
      })
      .on("data", (chunk) => {
        receivedBytes += chunk.length;
        progressBar.update(receivedBytes);
      })
      .pipe(file)
      .on("error", (err) => {
        fs.unlinkSync(filename);
        progressBar.stop();
        return callback(err.message);
      });

    file.on("finish", () => {
      progressBar.stop();
      file.close();
      resolve("finished");
    });

    file.on("error", (err) => {
      fs.unlinkSync(filename);
      progressBar.stop();
      return callback(err.message);
    });
  });
};

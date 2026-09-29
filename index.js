const { execFileSync, spawnSync } = require("node:child_process");
const { writeFileSync } = require("node:fs");
const path = require("node:path");

const date = process.argv[2];
const validFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/;

if (!date || !validFormat.test(date) || Number.isNaN(Date.parse(date)) || Date.parse(date) > Date.now()) {
  console.error("Usage: node index.js YYYY-MM-DDTHH:mm:ss+05:30 (a past date with a time-zone offset)");
  process.exit(1);
}

const repo = __dirname;
const file = path.join(repo, "data.json");

writeFileSync(file, `${JSON.stringify({ date })}\n`);
execFileSync("git", ["add", "--", "data.json"], { cwd: repo, stdio: "inherit" });

const diff = spawnSync("git", ["diff", "--cached", "--quiet", "--", "data.json"], { cwd: repo });
if (diff.status === 0) {
  console.error("data.json already has this value; there is no new change to commit.");
  process.exit(1);
}
if (diff.status !== 1) {
  throw diff.error || new Error("Could not check the staged change to data.json.");
}

execFileSync("git", ["commit", "-m", `Record ${date}`, "--only", "--", "data.json"], {
  cwd: repo,
  stdio: "inherit",
  env: { ...process.env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date },
});

console.log("Commit created. Run `git push origin master` to send it to GitHub.");

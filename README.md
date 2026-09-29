# git-testing

This repository experiments with dated Git commits.

## Run

From a clone on the `master` branch:

```bash
npm ci
git config --get user.email
node index.js
```

The script writes `data.json`, creates a commit with an author date three days before your computer's current local time, and pushes to the configured upstream branch. Make sure `master` tracks `origin/master` and your Git email is connected to your GitHub account.

To choose a different number of days, edit `moment().subtract(3, "d")` in `index.js`.

## Check the dates

```bash
git log -5 --pretty=fuller --date=iso-strict
```

`git commit --date` sets the author date; the committer date stays at the time you run the script. GitHub uses the author date for your profile calendar and the committer date in repository history. Commits must reach the default branch (`master` here), and qualifying contributions can take up to 24 hours to appear on the graph.

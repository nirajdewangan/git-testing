# git-testing

A small Git date experiment. The script requires Node.js and Git; it has no npm dependencies.

## Create a dated test commit

Run this from your clone on the `master` branch, using an explicit time-zone offset:

```bash
git config --get user.email
node index.js 2026-09-27T12:00:00+05:30
git push origin master
```

Use an email address connected to your GitHub account. The script changes only `data.json`, makes one commit, and prints an error if the file already has the requested value. It does not push automatically. Give it a date and time in the past, with an offset appropriate for your location.

## Check the contribution calendar

```bash
git log -5 --pretty=fuller --date=iso-strict
```

The **AuthorDate** determines the day on your GitHub profile; the **CommitDate** determines the date shown in the repository history. The script sets both to the requested date. A commit must also use an email linked to your GitHub account and reach the repository's default branch (`master` here). GitHub says the contribution calendar can take up to 24 hours to refresh after a qualifying commit.

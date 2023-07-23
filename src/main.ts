import * as core from '@actions/core';
import * as github from '@actions/github';
import simpleGit from 'simple-git';

async function run(): Promise<void> {
  let tagFrom = core.getInput('tagFrom');
  let tagTo = core.getInput('tagTo') ?? 'HEAD';
  const token = core.getInput('github_token');

  if (!tagFrom) {
    const octokit = github.getOctokit(token);
    const result = await octokit.rest.repos.listReleases({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo
    });
    if (result.data.length > 0) {
      const latestRelease = result.data[0];
      tagFrom = latestRelease.tag_name;
    } else {
      tagFrom = 'HEAD~100';
    }
  }

  const commits = await simpleGit().log({ from: tagTo, to: tagFrom });
  let changelog = '## Changelog\n\n';
  changelog += commits.all
    .map(
      c =>
        `* ${c.message} ([${c.hash.substring(0, 7)}](https://github.com/${github.context.repo.owner}/${
          github.context.repo.repo
        }/commit/${c.hash}))`
    )
    .reverse()
    .join('\n');

  core.setOutput('changelog', changelog);
  core.info(`ℹ️ Generated Changelog:\n${changelog}`);
}

void run();

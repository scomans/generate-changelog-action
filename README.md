# Generate changelog based on commits

This action generates a changelog based on the commits since the last release or a given tag.

## Inputs

### `tagFrom`

The tag to start from. If not provided, the latest tag will be used.

### `tagTo`

The tag to end at. If not provided, the HEAD tag will be used.

### `github_token`

**Required if repo is private** Your GitHub access token (see Usage below).

## Outputs

### `changelog`

The changelog in markdown format

## Example usage

```yaml
  - uses: scomans/generate-changelog-action@v1
    id: changelog
    with:
      fromTag: v1.2.3
      toTag: v1.2.5
      github_token: ${{ secrets.GITHUB_TOKEN }}

  - name: Echo changelog
    run: echo "${{ steps.changelog.outputs.changelog }}"

```

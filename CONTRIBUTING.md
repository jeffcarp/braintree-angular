# Deploy checklist

- `npm test`
- Build source to `dist/`
- Bump version of `bower.json`
- Bump version of `package.json`
- `git tag -m "0.0.0" 0.0.0`
- `git push`
- `git push --tags`
- `npm publish`


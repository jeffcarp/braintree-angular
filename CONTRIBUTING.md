# Deploy checklist

- `npm test`
- `npm run build`
- Bump version of `bower.json`
- Bump version of `package.json`
- `git add bower.json package.json`
- `git commit -m "Version 0.0.0"`
- `git tag -m "0.0.0" 0.0.0`
- `git push`
- `git push --tags`
- `npm publish`


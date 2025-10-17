# npm-fibonacci

Fibonacci done through recursive npm versions. Publishes one new version (=fibonacci number) every night!

install:
`npm install`

print the current number:
`node -e 'import("./index.js").then(m => console.log(m.default));'`

bump to next version with:
`node bump.js`

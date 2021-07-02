// Need any `import` or `export` so that it is an isolatedModule or ts complains
import fs from "fs"

const name = "John Doe"

console.log(`Hello ${name}`)

throw new Error("WTF!")

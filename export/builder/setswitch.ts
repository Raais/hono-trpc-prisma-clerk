import { parseArgs } from "util";

const path = "./export/builder/switch.ts";

const { values, positionals } = parseArgs({
    args: Bun.argv,
    options: {
      true: {
        type: 'boolean',
      },
    },
    strict: false,
    allowPositionals: true,
});

Bun.write(path, `export type building = ${values.true ? 'true' : 'false'};`);

console.clear();
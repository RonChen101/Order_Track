# 1 Property 'Autodesk' does not exist on type 'Window & typeof globalThis'.怎么办？

1. 安装类型包`npm install @types/forge-viewer --save-dev`。
2. 在项目根目录创建globals.d.ts文件，写入
```TypeScript
import * as ForgeTypes from '@types/forge-viewer';

declare global {
    interface Window {
        Autodesk: typeof ForgeTypes.Autodesk;
        THREE: typeof ForgeTypes.THREE;
    }
}

export { };
```
3. 在tsconfig.app.json文件的"include"中，写入"globals.d.ts"
```TypeScript
"include": [
    "env.d.ts",
    "src/**/*",
    "src/**/*.vue",
    "globals.d.ts"
],
```
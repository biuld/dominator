import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
    getWorker(_, label) {
        if (label === "json") {
            return new jsonWorker();
        }
        if (label === "css" || label === "scss" || label === "less") {
            return new cssWorker();
        }
        if (label === "html" || label === "handlebars" || label === "razor") {
            return new htmlWorker();
        }
        if (label === "typescript" || label === "javascript") {
            return new tsWorker();
        }
        return new editorWorker();
    },
};

// 动态加载 lib.dom.d.ts 文件
async function loadDomDefinitions() {
    // 从 public 目录加载 lib.dom.d.ts 文件
    const response = await fetch("/lib.dom.d.ts");

    if (!response.ok) {
        throw new Error(`Failed to load lib.dom.d.ts: ${response.statusText}`);
    }

    const libDomDefinitions = await response.text();

    // 将 lib.dom.d.ts 内容注入到 Monaco Editor 中
    monaco.languages.typescript.javascriptDefaults.addExtraLib(
        libDomDefinitions,
        "lib.dom.d.ts",
    );
}


export async function init(container) {
    await loadDomDefinitions();

    return monaco.editor.create(container, {
        value: "// Write your JavaScript here...\n",
        language: "javascript",
        theme: "vs-dark",
        automaticLayout: true, // 自动调整大小
    });
}
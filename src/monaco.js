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

async function loadDefinitions(filepath) {
    const response = await fetch(filepath);

    if (!response.ok) {
        throw new Error(`Failed to load lib.dom.d.ts: ${response.statusText}`);
    }

    const libDefinitions = await response.text();

    // 将 lib.dom.d.ts 内容注入到 Monaco Editor 中
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
        libDefinitions,
        filepath,
    );

    console.log(`${filepath} loaded`)
}

export async function initEditor(container) {
    return monaco.editor.create(container, {
        value: "// Write your Javascript here...\n",
        language: "typescript",
        theme: "vs-dark",
        automaticLayout: true, // 自动调整大小
    });
}

export async function initLib() {
    await loadDefinitions("/lib.d.ts")

    const resp = await fetch("/lib.js");
    const lib = await resp.text();
    browser.devtools.inspectedWindow.eval(lib);

    console.log("lib.js loaded")
}
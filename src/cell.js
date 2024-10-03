
import { initEditor, initOutput } from "./monaco";


// 定义 Cell 类
export class Cell {
    constructor() {
        this.code = '';
        this.editorContainer = null;
        this.consoleContainer = null
    }

    // 执行编辑器中的代码
    async run() {
        try {
            let res = await browser.devtools.inspectedWindow.eval(this.code)
            this.output.setValue(JSON.stringify(res, null, 2));
        } catch (error) {
            this.output.setValue(`Error: ${error.message}`);
        }
    }

    // 初始化 Monaco Editor
    initEditor() {
        this.editor = initEditor(this.editorContainer)

        // 更新代码内容
        this.editor.onDidChangeModelContent(() => {
            this.code = this.editor.getValue();
        });
    }

    initOutput() {
        this.output = initOutput(this.consoleContainer)
    }
}

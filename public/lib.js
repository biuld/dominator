

const dominator = {
    downloadFile(url, filename) {
        // 发送消息给 content.js
        window.postMessage({
            action: 'downloadFile',
            url: url,
            filename: filename
        }, '*'); // '*' 表示接收来自任何源的消息
    },

    selectAttrAll(path, attr) {
        return [...document.querySelectorAll(path)]
            .map(e => e.getAttribute(attr))
    }
}
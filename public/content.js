console.log('Content script loaded');

// 监听来自页面的 postMessage 消息
window.addEventListener('message', (event) => {
    // 确保消息来源是当前页面，而不是其他窗口
    if (event.source !== window) {
        return;
    }

    // 检查消息类型
    if (event.data.action === 'downloadFile') {
        const { url, filename } = event.data;

        //向background.js发送下载请求
        browser.runtime.sendMessage({
            action: 'download',
            url: url,
            filename: filename
          });
    }
});

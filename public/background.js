
browser.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});


// background.js 中处理下载请求
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'download' && message.url && message.filename) {
    browser.downloads.download({
      url: message.url,
      filename: message.filename,
      conflictAction: 'uniquify',
      saveAs: false // 自动下载，不弹出保存对话框
    }).then(downloadId => {
      console.log(`Download started with ID: ${downloadId}`);
    }).catch(error => {
      console.error(`Download failed: ${error}`);
    });
  }
});
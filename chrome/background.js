chrome.webRequest.onBeforeRequest.addListener(
    () => {
        return {cancel: true}
    },
    {urls: ["*://*.moyu.im/*"], types: ["image"]},
    ["blocking"]
);

chrome.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
        let headers = details.requestHeaders;
        headers.push({name: "Referer", value: "https://weibo.com/"});

        return {requestHeaders: headers};
    },
    {urls: ["*://*.sinaimg.cn/*"], types: ["image", "main_frame"]},
    ["blocking", "requestHeaders", "extraHeaders"]
);
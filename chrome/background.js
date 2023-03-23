chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
        return {redirectUrl: details.url.replace('moyu.im', 'sinaimg.cn')};
    },
    {urls: ["*://*.moyu.im/*"], types: ["image", "main_frame"]},
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
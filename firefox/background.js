browser.webRequest.onBeforeRequest.addListener(
    (details) => {
        // modify from: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/StreamFilter/ondata
        let filter = browser.webRequest.filterResponseData(details.requestId);
        let decoder = new TextDecoder("utf-8");
        let encoder = new TextEncoder();

        const data = [];
        filter.ondata = (event) => {
            data.push(decoder.decode(event.data, {stream: true}));
        };

        filter.onstop = () => {
            data.push(decoder.decode());

            let str = data.join("");
            str = str.replaceAll(/(?<!img\.)moyu\.im/g, 'sinaimg.cn');
            str = str.replaceAll("//img.toto.im", '//gzw.sinaimg.cn');
            filter.write(encoder.encode(str));
            filter.close();
        };
    },
    {urls: ["*://jandan.net/api/*", "*://i.jandan.net/api/*"]},
    ["blocking"]
);

browser.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
        let headers = details.requestHeaders;
        headers.push({name: "Referer", value: "https://weibo.com/"});

        return {requestHeaders: headers};
    },
    {urls: ["*://*.sinaimg.cn/*"], types: ["image", "main_frame"]},
    ["blocking", "requestHeaders"]
);
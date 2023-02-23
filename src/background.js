// modify from: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/StreamFilter/ondata
function replaceDomain(details) {
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
        str = str.replaceAll(/moyu\.im/g, 'sinaimg.cn');
        filter.write(encoder.encode(str));
        filter.close();
    };
}


function addReferer(details) {
    if (details.originUrl.indexOf('jandan.net') === -1) {
        return {};
    }

    let headers = details.requestHeaders;
    headers.push({name: "Referer", value: "https://weibo.com/"});

    return {requestHeaders: headers};
}

browser.webRequest.onBeforeRequest.addListener(
    replaceDomain,
    {urls: ["*://jandan.net/*", "*://i.jandan.net/*"], types: ["main_frame"]},
    ["blocking"]
);

browser.webRequest.onBeforeSendHeaders.addListener(
    addReferer,
    {urls: ["*://*.sinaimg.cn/*"], types: ["image"]},
    ["blocking", "requestHeaders"]
);
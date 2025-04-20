const TOTO_IMG_URL = 'https://img.toto.im';
const SINA_IMG_URL = 'https://tva1.sinaimg.cn';

const WEIBO_REFERER = 'https://weibo.com/';

const API_URL_PATTERNS = [
    "*://jandan.net/api/*",
    "*://i.jandan.net/api/*",
    "*://jandan.net/t/*",
    "*://i.jandan.net/t/*"
];
const SINAIMG_URL_PATTERN = "*://*.sinaimg.cn/*";

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
            str = str.replaceAll(TOTO_IMG_URL, SINA_IMG_URL);
            filter.write(encoder.encode(str));
            filter.close();
        };
    },
    {
        urls: API_URL_PATTERNS
    },
    ["blocking"]
);

const SINAIMG_FILTER = {
    urls: [SINAIMG_URL_PATTERN],
    types: ["image", "main_frame"]
};

browser.webRequest.onHeadersReceived.addListener(
    (details) => {
        if (details.statusCode !== 200) {
            return {redirectUrl: details.url.replace(SINA_IMG_URL, TOTO_IMG_URL)};
        }
    },
    SINAIMG_FILTER,
    ["blocking", "responseHeaders"],
);

browser.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
        let headers = details.requestHeaders;
        headers.push({name: "Referer", value: WEIBO_REFERER});

        return {requestHeaders: headers};
    },
    SINAIMG_FILTER,
    ["blocking", "requestHeaders"]
);


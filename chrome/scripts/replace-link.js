function replaceElementByAttribute(element, attr) {
    let value = element.getAttribute(attr);
    if (value !== null) {
        element.setAttribute(attr, value.replace("moyu.im", "sinaimg.cn"));
    }
}

let imgs = document.getElementsByTagName("img");
for (let img of imgs) {
    replaceElementByAttribute(img, "src")
    replaceElementByAttribute(img, "org_src");
}

let links = document.getElementsByClassName("view_img_link");
for (let link of links) {
    replaceElementByAttribute(link, "href");
}
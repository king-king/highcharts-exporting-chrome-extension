/*globals chrome*/
chrome.runtime.onMessage.addListener((req) => {
    chrome.browserAction.setIcon({
        path: req === 'enable' ? 'img/16_icon.png' : 'img/16_icon-alpha.png'
    });
});
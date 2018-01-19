/*globals chrome*/
chrome.runtime.onMessage.addListener((req) => {
    chrome.browserAction.setIcon({
        path: req === 'enable' ? 'img/icon.png' : 'img/icon-alpha.png'
    });
});
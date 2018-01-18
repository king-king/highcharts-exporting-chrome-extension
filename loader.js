/* global chrome */
let script = document.createElement('script');
script.src = chrome.extension.getURL('./inser/exportint.js');
document.body.appendChild(script);
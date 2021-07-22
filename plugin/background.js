let enabled = {};

chrome.action.onClicked.addListener((tab) => {
  if (enabled[tab.id]) {
    return;
  }

// chrome.browserAction.setBadgeText({text: 'ON'});

  enabled[tab.id] = true;
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["contentScript.js"]
  });
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ["contentScript.css"]
  });
});

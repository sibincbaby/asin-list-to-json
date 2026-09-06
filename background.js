// activeTab: the click itself grants access to that one tab, so the extension
// needs no host permissions and does nothing until asked.
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["export.js"] });
});

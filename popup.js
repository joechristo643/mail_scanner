

scanMail.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
   
    chrome.tabs.executeScript(null, {file: "firebase/firebase.js"});
    chrome.tabs.executeScript(null, {file: "firebase/firebase-app.js"});
    chrome.tabs.executeScript(null, {file: "firebase/firebase-database.js"});
    chrome.tabs.executeScript(null, {file: "saveMail.js"});
});
  };
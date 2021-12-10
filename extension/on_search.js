const pa11y = require('pa11y');

function getResults(){
    // Note: console.log calls in exectuedScripts show up in the pages stack trace.
    var searchBody = document.getElementById("search");
    var linkElements = searchBody.getElementsByTagName("a");
    // TODO: Filter out where role = button
    // TODO: Filter out where href begins with /search
    let relevantLinkElements = [];
    for( var linkElement of linkElements){
        if(!linkElement.hasAttribute('role') && !linkElement.getAttribute('href').startsWith('/search')){
            relevantLinkElements += [linkElement];
        }
    }
    for(var linkElement of relevantLinkElements){
        scoreSearchResult(linkElement);
    }
}
function scoreSearchResult(linkElement){
    pa11y(linkElement.href).then((results) => {
        console.log(linkElement);
        console.log(results);
});
}
chrome.webRequest.onCompleted.addListener(function(details) {
    chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        function: getResults 
      });
  },
  {urls: ['*:\/\/*.google.com/search?q=*']}
);


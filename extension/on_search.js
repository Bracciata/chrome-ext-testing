
function getResults(){
    // Note: console.log calls in exectuedScripts show up in the pages stack trace.
    var searchBody = document.getElementById("search");
    var linkElements = searchBody.getElementsByTagName("a");
    // TODO: Filter out where role = button
    // TODO: Filter out where href begins with /search
    let relevantLinkElements = [];
    for( var linkElement of linkElements){
        let gContainer = linkElement.parentNode.parentNode.parentNode.parentNode;
        if(!linkElement.hasAttribute('role') && !linkElement.getAttribute('href').startsWith('/search')&&!gContainer.firstChild.innerHTML.startsWith('Score:')){
            relevantLinkElements += [linkElement];
            let score  = document.createElement("span")
            score.innerHTML = 'Score: 70';
            gContainer.insertBefore(score,gContainer.firstChild);
        }
    }
    
    for(var linkElement of relevantLinkElements){
        scoreSearchResult(linkElement);
    }
}
function scoreSearchResult(linkElement){
}
chrome.webRequest.onCompleted.addListener(function(details) {
    chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        function: getResults 
      });
  },
  {urls: ['*:\/\/*.google.com/search?q=*']}
);


function getResults(){
    // Note: console.log calls in exectuedScripts show up in the pages stack trace.
    var searchBody = document.getElementById("search");
    var links = searchBody.getElementsByTagName("a");
    // TODO: Filter out where role = button
    // TODO: Filter out where href begins with /search
    for( var link of links){
        console.log(link);
    }
}
chrome.webRequest.onCompleted.addListener(function(details) {
    chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        function: getResults 
      });
  },
  {urls: ['*:\/\/*.google.com/search?q=*']}
);


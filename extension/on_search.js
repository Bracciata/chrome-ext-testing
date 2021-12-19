
async function getResults() {
    // Note: console.log calls in exectuedScripts show up in the pages stack trace.
    var searchBody = document.getElementById("search");
    var linkElements = searchBody.getElementsByTagName("a");
    let first = true;
    for (var linkElement of linkElements) {
        console.log(linkElement)
        let gContainer = linkElement.parentNode.parentNode.parentNode.parentNode;
        if (!linkElement.hasAttribute('role') && gContainer.classList.contains('g')&& linkElement.hasAttribute('data-ved') && !linkElement.getAttribute('href').startsWith('/search') && !gContainer.firstChild.innerHTML.startsWith('Score:')) {
            let score = document.createElement("span");
            score.innerHTML = 'Score: Loading';
            gContainer.insertBefore(score, gContainer.firstChild);
            if (first) {
                first = false
                fetch(`http://localhost:8080?url=${encodeURIComponent(linkElement.href)}`).then((results) => {
                    return results.json();
                }).then(json => {
                    if(json.issues){  
                        score.innerHTML = `Score: ${json.issues} errors`;
                    }else{
                        score.innerHTML = `Pa11y could not process this link - Error was ${json.error}`;
                    }
                });
                score.innerHTML = "Score: Loading";
            } else {
                score.innerHTML = "Score: I don't have the money for more than one API call"
            }
        }
    }

}

chrome.webRequest.onCompleted.addListener(function (details) {
    chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        function: getResults
    });
},
    { urls: ['*:\/\/*.google.com/search?q=*'] }
);


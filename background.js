chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
  const url = new URL(details.url);
  const searchParams = new URLSearchParams(url.search);
  const encodedQuery = searchParams.get("q");
  const query = decodeURIComponent(encodedQuery);
  const startsWithGo = details.url.startsWith("go/");
  const hasQuery = query;
  if (startsWithGo || hasQuery) {
    // Retrieve the mapping from the database
    let mapping;
    if (startsWithGo) {
      mapping = getMapping(details.url);
    } else if (hasQuery) {
      mapping = getMapping(query);
    }
    if (mapping) {
      // Redirect the URL to the mapped URL
      chrome.tabs.update(details.tabId, { url: mapping });
    }
  }
});

function getMapping(url) {
  // Retrieve the mapping from the database using an API call or any other method
  // In this example, we'll just use a hard-coded mapping for demonstration purposes
  const mappings = {
    "go/example": "https://www.example.com",
    "go/google": "https://www.google.com",
  };
  return mappings[url];
}

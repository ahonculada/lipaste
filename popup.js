document.getElementById('submit').addEventListener('click', () => {
    const pgnValue = document.getElementById('pgn').value;
    handleSubmit(pgnValue);
});

function handleSubmit(pgn) {
    chrome.tabs.create({
        url: `https://lichess.org/paste`
    }, (tab) => {
        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
            if (tabId === tab.id && changeInfo.status === 'complete') {
                chrome.tabs.onUpdated.removeListener(listener);
                chrome.tabs.sendMessage(tabId, { action: 'pastePGN', pgn: pgn });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('pgn').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents a new line from being added
            document.getElementById('submit').click();
        }
    });
});
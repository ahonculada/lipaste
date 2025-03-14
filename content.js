chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'pastePGN') {
        const pgnBox = document.querySelector('textarea#form3-pgn');
        const analysisCheckbox = document.querySelector('input#form3-analyse');
        const importButton = document.querySelector('button.submit');

        if (pgnBox && analysisCheckbox && importButton) {
            pgnBox.value = request.pgn;
            analysisCheckbox.checked = true;
            importButton.click();
        }
    }
});
(function () {
    const table = document.getElementById('bagua-table');

    let editTd = null
    let saved = null

    table.addEventListener('click', (e) => {
        let curr = e.target;
        while (curr.tagName !== 'TD') curr = curr.parentElement
        
        // if we're currently editing walk away
        if (curr === editTd)
            return;
        else {
            // two posibilites here; clicking a new td, or beginning editing
            
        }
        console.warn(curr.tagName);
    });

})();
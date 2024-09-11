export async function fetchBoxScore() {
    function getFormattedDate() {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Get month and pad with leading zero if necessary
        const day = String(today.getDate()).padStart(2, '0'); // Get day and pad with leading zero if necessary
        const year = today.getFullYear(); // Get full year
        return `${month}/${day}/${year}`;
    }
    const dateToday = getFormattedDate();
    const url = `https://proxy.cors.sh/https://stats.ncaa.org/contests/livestream_scoreboards?utf8=&season_division_id=18323&game_date=${dateToday}`;
    
    try {
        const response = await fetch(url);
        
        // Get the HTML as a text string
        const htmlData = await response.text();
        
        // Parse the HTML string into a document
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlData, 'text/html');
        
        // Extract all the divs with class "table-responsive"
        const tableResponsiveDivs = doc.querySelectorAll('div.table-responsive');
        
        // Loop through the divs and append them to the output container
        let extractedHTML = '';
        tableResponsiveDivs.forEach(div => {
            extractedHTML += div.outerHTML; // Append the outer HTML of each div
        });
        
        // Output the extracted HTML content inside the scores-output div
        document.getElementById('box-score-output').innerHTML = extractedHTML;
    } catch (error) {
        console.error("Error fetching the data:", error);
        document.getElementById('box-score-output').textContent = 'Error loading data.';
    }
}
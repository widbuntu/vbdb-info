console.log("fetch_live_score.js loaded");

export async function fetch_live_score(startDate, endDate) {
    console.log("fetch_live_score called with date range:", startDate, "to", endDate);

    async function fetchGamesData(date) {
        const url = `https://corsproxy.io/?https://data.ncaa.com/casablanca/scoreboard/volleyball-women/d1/${date}/scoreboard.json`;
        console.log("Fetching from URL:", url);
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log("Data fetched successfully for date:", date);
            return data.games || [];
        } catch (error) {
            console.error("Error fetching data for date:", date, error);
            return []; // Return an empty array instead of throwing, so we can continue with other dates
        }
    }

    function createTable(gamesData) {
        console.log("Creating table with data:", gamesData);
        let tableHTML = `
        <div class="table-container" style="overflow-y: auto; overflow-x: auto; margin: 0 auto; width: auto; height: 600px; overflow: scroll; font-size: 13px;">
            <table border="1" style="border-collapse: collapse; width: auto;">
                <thead>
                    <tr style="background: #eee;">
                        <th style="background: #333; color: white; padding: 6px; border: 1px solid #ccc; text-align: center; position: sticky; top: 0; z-index: 1;">Date</th>
                        <th style="background: #333; color: white; padding: 6px; border: 1px solid #ccc; text-align: center; position: sticky; top: 0; z-index: 1;">Home Team</th>
                        <th style="background: #333; color: white; padding: 6px; border: 1px solid #ccc; text-align: center; position: sticky; top: 0; z-index: 1;">Away Team</th>
                        <th style="background: #333; color: white; padding: 6px; border: 1px solid #ccc; text-align: center; position: sticky; top: 0; z-index: 1;">Result</th>
                    </tr>
                </thead>
                <tbody>
        `;

        gamesData.forEach(game => {
            tableHTML += `
                <tr>
                    <td style="padding: 4px; text-align: left; white-space: nowrap;">${game.game.startDate}</td>
                    <td style="padding: 4px; text-align: left; white-space: nowrap;">${game.game.home.names.short} (${game.game.home.conferences[0]?.conferenceName || 'N/A'})</td>
                    <td style="padding: 4px; text-align: left; white-space: nowrap;">${game.game.away.names.short} (${game.game.away.conferences[0]?.conferenceName || 'N/A'})</td>
                    <td style="padding: 4px; text-align: left; white-space: nowrap;">(${game.game.home.score} - ${game.game.away.score})</td> 
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        return tableHTML;
    }


    function getDatesInRange(start, end) {
        const dates = [];
        let currentDate = new Date(start);
        const endDate = new Date(end);

        while (currentDate <= endDate) {
            dates.push(currentDate.toISOString().split('T')[0].replace(/-/g, '/'));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    }

    const dateRange = getDatesInRange(startDate, endDate);
    let allGamesData = [];

    for (const date of dateRange) {
        const gamesData = await fetchGamesData(date);
        allGamesData = allGamesData.concat(gamesData);
    }

    if (allGamesData.length > 0) {
        console.log("Games data received, creating table");
        return createTable(allGamesData);
    } else {
        console.log("No games data available for the date range:", startDate, "to", endDate);
        return 'No games data available for the selected date range.';
    }
}
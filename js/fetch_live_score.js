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
            <div class="table-container" style="max-height: 600px; overflow-y: auto; margin: 0 auto;">
                <table border="1" style="border-collapse: collapse; width: 100%; margin: 0 auto;">
                    <thead>
                        <tr>
                            <th style="padding: 8px 10px;">Date</th>
                            <th style="padding: 8px 10px;">Away Conf</th>
                            <th style="padding: 8px 10px;">Away Team</th>
                            <th style="padding: 8px 10px;">Away Score</th>
                            <th style="padding: 8px 10px;">Home Conf</th>
                            <th style="padding: 8px 10px;">Home Team</th>
                            <th style="padding: 8px 10px;">Home Score</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        gamesData.forEach(game => {
            tableHTML += `
                <tr>
                    <td style="padding: 8px;">${game.game.startDate}</td>
                    <td style="padding: 8px;">${game.game.away.conferences[0]?.conferenceName || 'N/A'}</td>
                    <td style="padding: 8px;">${game.game.away.names.full}</td>
                    <td style="padding: 8px;">${game.game.away.score}</td>
                    <td style="padding: 8px;">${game.game.home.conferences[0]?.conferenceName || 'N/A'}</td>
                    <td style="padding: 8px;">${game.game.home.names.full}</td>
                    <td style="padding: 8px;">${game.game.home.score}</td>
                </tr>
            `;
        });

        tableHTML += `
                    </tbody>
                </table>
            </div>
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
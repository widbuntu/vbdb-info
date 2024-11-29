import { urlLink } from './utils.js';

function createVBDBItem() {
    return `
        <h2 class="text-center">VBDB</h2>
        <div class="welcome-section">
        A place for simple fast volleyball results, rankings, and teams! Live Scores and Rankings for DI. Results and Rankings updated daily.
        Enjoy!
        </div>
        <hr>
        
        <h2 class="text-center"><i class="fas fa-download"></i> Data Downloads</h2>
<div class="grid-container">
    <div class="grid-column">
        <h4>Results</h4>
        ${urlLink('DI Results', 'https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/ncaaw_d1_24.csv')}
        ${urlLink('DII Results', 'https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/ncaaw_d2_24.csv')}
        ${urlLink('DIII Results', 'https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/ncaaw_d3_24.csv')}
    </div>
    <div class="grid-column">
        <h4>Rankings & Teams</h4>
        ${urlLink('DI Rankings', 'https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/fig_stats.csv')}
        ${urlLink('DI-III Teams', 'https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/teams2.csv')}
    </div>
    <div class="grid-column">
        <h4>Players</h4>
        ${urlLink('DI Players', 'https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/ncaaw_d1_24_players.csv')}
        ${urlLink('DII Players', 'https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/ncaaw_d2_24_players.csv')}
        ${urlLink('DIII Players', 'https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/ncaaw_d3_24_players.csv')}
    </div>
</div>
<hr>
<h2 class="text-center">Data Sources</h2>
<div class="grid-container" style="grid-template-columns: 1fr;">
    <div class="grid-column">
        ${urlLink('NCAA Stats', 'https://stats.ncaa.org')}
        ${urlLink('NCAA RPI', 'https://www.ncaa.com/rankings/volleyball-women/d1/ncaa-womens-volleyball-rpi')}
        ${urlLink('Fig Stats', 'https://ncaastats.figstats.net/volleyball-rpi.cgi')}
        ${urlLink('Evollve', 'https://evollve.net/')}
    </div>
</div>
<style>
.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; /* Three equal columns */
    gap: 1rem;
    text-align: center;
    margin: 1rem auto;
}

.grid-column {
    background-color: #333;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}
.grid-column:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
}

.grid-column h4 {
    color: white;
    margin-bottom: 1rem;
}
.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.5rem;
    text-align: center;
}
.welcome-section {
   background-color: #333;
   border-radius: 8px;
   padding: 1rem;
   margin: 0 auto 2rem;
   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
            
    `;
}

export function loadVBDBContent() {
    const vbdbContent = document.getElementById('vbdb');
    if (vbdbContent) {
        vbdbContent.innerHTML = createVBDBItem();
    }
}
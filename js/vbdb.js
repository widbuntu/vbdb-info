import { urlLink } from './utils.js';

function createVBDBItem() {
    return `
        <h2 class="text-center">VBDB Content</h2>
        <p class="text-center">Welcome to VBDB!</p>
        <p class="text-center">Scores updates for NCAA Division I, II & III Women's Volleyball! Rankings (DI). Results and Rankings updated daily.</p>
        <p class="text-center">Live is DI & updated every 45 seconds while open.</p>
        <hr>
        <h2 class="text-center">Data Downloads</h2>
            ${urlLink('DI Results', 'https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/ncaaw_d1_24.csv')}
            ${urlLink('DII Results', 'https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/ncaaw_d2_24.csv')}
            ${urlLink('DIII Results', 'https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/ncaaw_d3_24.csv')}
            ${urlLink('Rankings', 'https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/fig_stats.csv')}
            ${urlLink('Teams', 'https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/teams2.csv')}
            ${urlLink('Players', 'https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/players.csv')}
        <hr>
        <h2 class="text-center">Data Sources</h2>
            ${urlLink('NCAA Stats', 'https://stats.ncaa.org')}
            ${urlLink('NCAA RPI', 'https://www.ncaa.com/rankings/volleyball-women/d1/ncaa-womens-volleyball-rpi')}
            ${urlLink('Fig Stats', 'https://ncaastats.figstats.net/volleyball-rpi.cgi')}
    `;
}

export function loadVBDBContent() {
    const vbdbContent = document.getElementById('vbdb');
    if (vbdbContent) {
        vbdbContent.innerHTML = createVBDBItem();
    }
}
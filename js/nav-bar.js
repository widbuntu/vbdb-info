function createNavItem(id, target, label, isActive = false) {
    return `
        <li class="nav-item" role="presentation">
            <button class="nav-link ${isActive ? 'active' : ''}" id="${id}-tab" data-bs-toggle="tab" data-bs-target="#${target}" type="button"
                role="tab" aria-controls="${target}" aria-selected="${isActive}">
                ${label}
            </button>
        </li>
    `;
}

export function loadNavItems() {
    const navItems = [
        { id: 'vbdb', target: 'vbdb', label: 'VBDB', isActive: true },
        { id: 'live', target: 'live', label: 'Live', isActive: false },
        { id: 'results', target: 'results', label: 'Results', isActive: false },
        { id: 'rankings', target: 'rankings', label: 'Rankings', isActive: false },
        { id: 'teams', target: 'teams', label: 'Teams', isActive: false },
        { id: 'players', target: 'players', label: 'Players', isActive: false },
    ];

    const navItemsContainer = document.getElementById('nav-items');
    navItems.forEach(item => {
        navItemsContainer.innerHTML += createNavItem(item.id, item.target, item.label, item.isActive);
    });
}

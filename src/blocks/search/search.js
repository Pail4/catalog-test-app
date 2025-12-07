export function initSearch(store) {
    const searchInput = document.querySelector('.search__input');

    if (!searchInput) return;

    let debounceTimer;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const query = e.target.value;
            store.setSearch(query);
        }, 300);
    });

    searchInput.addEventListener('focus', () => {
        searchInput.classList.add('search__input--focused');
    });

    searchInput.addEventListener('blur', () => {
        searchInput.classList.remove('search__input--focused');
    });
}
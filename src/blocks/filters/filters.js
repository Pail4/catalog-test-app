import { TAGS } from '../../consts/TAGS.js';

export function initFilters(store) {
    const filtersContainer = document.querySelector('.filters');
    const filterTemplate = document.querySelector('#filter-card-template');

    if (!filtersContainer || !filterTemplate) return;

    const allClone = filterTemplate.content.cloneNode(true);
    const allBtn = allClone.querySelector('.filter-card');
    const allText = allClone.querySelector('.filter-card__text');
    const allCounter = allClone.querySelector('.filter-card__counter');

    allBtn.dataset.tag = '';
    allBtn.classList.add('filter-card--active');
    allText.textContent = 'All';
    allCounter.textContent = store.data.length;

    filtersContainer.appendChild(allClone);

    TAGS.forEach(tag => {
        const count = store.getCardsByTag(tag.label).length;

        const clone = filterTemplate.content.cloneNode(true);
        const filterBtn = clone.querySelector('.filter-card');
        const filterText = clone.querySelector('.filter-card__text');
        const filterCounter = clone.querySelector('.filter-card__counter');

        filterBtn.dataset.tag = tag.label;
        filterText.textContent = tag.label;
        filterCounter.textContent = count;

        filtersContainer.appendChild(clone);
    });

    filtersContainer.addEventListener('click', (e) => {
        const filterBtn = e.target.closest('.filter-card');
        if (!filterBtn) return;

        filtersContainer.querySelectorAll('.filter-card').forEach(btn => {
            btn.classList.remove('filter-card--active');
        });

        filterBtn.classList.add('filter-card--active');
        const selectedTag = filterBtn.dataset.tag;
        store.setTag(selectedTag);
    });
}
import { setCardList } from "./src/blocks/card-list/card-list.js";
import { initSearch } from "./src/blocks/search/search.js";
import { initFilters } from "./src/blocks/filters/filters.js";
import { Store } from "./src/store/store.js";

const store = new Store();
window.store = store;

store.subscribe((filteredCards) => {
    setCardList(filteredCards);
});

store.init().then(() => {
    initSearch(store);
    initFilters(store);
});
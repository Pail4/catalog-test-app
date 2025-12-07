import { fetchCards } from "../api/api.js";

export class Store {
    constructor() {
        this.data = [];
        this.query = "";
        this.tag = "";
        this.listeners = new Set();
    }

    async init() {
        await this.loadData();
        this.notify();
    }

    async loadData() {
        try {
            const items = await fetchCards();
            this.data = (items || []).map((item, i) => ({ ...item, id: String(item.id ?? i) }));
            this.notify();
            return this.data;
        } catch (err) {
            console.error("Store.loadData error:", err);
            this.data = [];
            this.notify();
            throw err;
        }
    }

    setSearch(newQuery = "") {
        this.query = String(newQuery).trim().toLowerCase();
        this.notify();
    }

    setTag(newTag = "") {
        this.tag = String(newTag).trim().toLowerCase();
        this.notify();
    }

    getCardsByTag(tag = "") {
        const normalizedTag = String(tag).trim().toLowerCase();
        return this.data.filter(item => {
            const itemTag = (item.tag || "").toLowerCase();
            return !normalizedTag || itemTag === normalizedTag;
        });
    }

    getCardsByQuery(query = "") {
        const normalizedQuery = String(query).trim().toLowerCase();
        return this.data.filter(item => {
            const name = (item.name || "").toLowerCase();
            return !normalizedQuery || name.includes(normalizedQuery);
        });
    }

    getFiltered() {
        const byTag = this.getCardsByTag(this.tag);
        const byQuery = this.getCardsByQuery(this.query);

        return byTag.filter(item => byQuery.some(queryCard => queryCard.id === item.id));
    }

    subscribe(newListener) {
        if (typeof newListener !== "function") return;
        this.listeners.add(newListener);

        try {
            newListener(this.getFiltered());
        } catch (e) {
            console.error(e);
        }

        return () => this.unsubscribe(newListener);
    }

    unsubscribe(listener) {
        this.listeners.delete(listener);
    }

    notify() {
        const payload = this.getFiltered();
        this.listeners.forEach(listener => {
            try {
                listener(payload);
            } catch (e) {
                console.error(e);
            }
        });
    }
}
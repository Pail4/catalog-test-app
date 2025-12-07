export async function fetchCards() {
    const url = new URL('./cards.json', import.meta.url);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Fetch error ${res.status}`);
    return res.json();
}

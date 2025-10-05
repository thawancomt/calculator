export type HistoryItem = {
    expression: string
    result: string
}

const HISTORY_KEY = "calculation_history"

export function getHistory(): HistoryItem[] {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? JSON.parse(raw) : [];
}

export function addHistory(item: HistoryItem): void {
    const raw = getHistory()

    const newItem = JSON.stringify([
        ...raw.slice(-10), item
    ]
    )

    localStorage.setItem(HISTORY_KEY, newItem)
}

export function clearHistory(): void {
    localStorage.removeItem(HISTORY_KEY)
}


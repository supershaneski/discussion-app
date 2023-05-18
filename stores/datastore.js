import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const useDataStore = create(
    persist(
        (set, get) => ({
            characters: [
                { id: 0, name: 'Capitalist', description: '' },
                { id: 1, name: 'Socialist', description: '' },
                { id: 2, name: 'Libertarian', description: '' },
            ],
            data: [],
            update: (characters) => set({ characters }),
            add: (item) => {

                let data = get().data.slice(0)
                data.push(item)

                set({ data })

            },
            clear: () => set({ data: [] }),
        }),
        {
            name: "discussion-messages-storage",
            storage: createJSONStorage(() => localStorage),
            version: 1,
        }
    )
)

export default useDataStore
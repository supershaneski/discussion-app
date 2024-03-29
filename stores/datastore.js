import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const useDataStore = create(
    persist(
        (set, get) => ({
            characters: [
                { id: "b1aoe817ieo", name: 'Capitalist', description: '' },
                { id: "5ldkam75ebol", name: 'Socialist', description: '' },
                { id: "hbe79l05h33h", name: 'Libertarian', description: '' },
            ],
            data: [],
            deleteStatus: 0,
            clearStatus: 0,
            update: (characters) => set({ characters }),
            add: (item) => {

                let data = get().data.slice(0)
                data.push(item)

                set({ data })

            },
            delete: (id) => {
                let data = get().data.slice(0).filter((item) => item.gid !== id)
                set({ data })
            },
            updateDelete: (v) => set({ deleteStatus: v }),
            updateClear: (v) => set({ clearStatus: v }),
            clear: () => set({ data: [] }),
        }),
        {
            name: "discussion-messages-storage",
            storage: createJSONStorage(() => localStorage),
            version: 2,
        }
    )
)

export default useDataStore
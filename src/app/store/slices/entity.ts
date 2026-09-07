import { EntitySlice, RootState } from "@/interfaces/globalState"
import { StateCreator } from "zustand"

export const entityInitialState: EntitySlice = {
    entity_uid: '',
    colors: [],
    name: '',
    short_name: ''
}

export const createEntitySlice: StateCreator<
  RootState,
  [],
  [],
  {entity: EntitySlice}
> = (set) => ({
  entity: entityInitialState,
})

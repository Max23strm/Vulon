import { RootState, UserSlice } from "@/interfaces/globalState"
import { StateCreator } from "zustand"

export const userInitialState: UserSlice = {
    user_uid: '',
    email: '',
    username: '',
    first_name: '',
    last_name: ''
}

export const createUserSlice: StateCreator<
  RootState,
  [],
  [],
  {user: UserSlice}
> = (set) => ({
  user: userInitialState,
})

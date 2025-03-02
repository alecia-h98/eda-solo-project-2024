import { create } from "zustand";
import userSlice from './slices/user.slice.js';
import foundSlice from "./slices/found.slice.js";
import itemSlice from "./slices/item.slice.js";
import miscSlice from "./slices/misc.slice.js";
import favoritesSlice from "./slices/favorites.slice.js";


// Combine all slices in the store:
const useStore = create((...args) => ({
  ...userSlice(...args),
  ...foundSlice(...args),
  ...itemSlice(...args),
  ...miscSlice(...args),
  ...favoritesSlice(...args)
}))


export default useStore;

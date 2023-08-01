import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    users: []
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    add_user: (state, action) => {
        state.users.push({user: action.payload})
    }
})


export const { add_user } = gameSlice.actions;

export default gameSlice.reducer;
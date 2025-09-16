import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
    name : 'todo',
    initialState : [],
    reducers:{
        addTodo : (state, action) =>{
            state.push(action.payload)
        },
        deleteAll : (state) =>{
           return state = []
        },
        deleteOne : (state , action) =>{
            return  state.filter((_,idx)=> idx !== action.payload)
        },
        updateTodo: (state, action) => {
      const { index, newText } = action.payload;
      state[index] = newText; // mutate allowed by Immer
    },
    }

});

export const { addTodo, deleteAll, deleteOne, updateTodo } = todoSlice.actions;
export default todoSlice.reducer
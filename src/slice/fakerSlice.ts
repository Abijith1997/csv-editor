import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BookRow } from "../types/types";

interface BooksState {
  rows: BookRow[]; // current working copy
  originalRows: BookRow[]; // immutable safe copy
  headers: (keyof BookRow)[]; // dynamic headers
}

const initialState: BooksState = {
  rows: [],
  originalRows: [],
  headers: [], // start empty
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<BookRow[]>) => {
      state.rows = action.payload;
      state.originalRows = [...action.payload]; // deep safe copy

      // Set headers dynamically from the first row (if exists)
      if (action.payload.length > 0) {
        state.headers = Object.keys(action.payload[0]) as (keyof BookRow)[];
      } else {
        state.headers = [];
      }
    },

    // 🔹 Update a single cell by rowIndex + column + newValue
    updateBook: (
      state,
      action: PayloadAction<{
        rowIndex: number;
        column: keyof BookRow;
        value: string;
      }>
    ) => {
      const { rowIndex, column, value } = action.payload;
      if (state.rows[rowIndex]) {
        state.rows[rowIndex] = {
          ...state.rows[rowIndex],
          [column]: value,
        };
      }
    },

    deleteBook: (state, action: PayloadAction<number>) => {
      state.rows.splice(action.payload, 1);
    },

    addBook: (state, action: PayloadAction<BookRow>) => {
      state.rows.push(action.payload);
    },

    resetBooks: (state) => {
      state.rows = [...state.originalRows]; // restore safe copy
    },
  },
});

export const { setBooks, updateBook, deleteBook, addBook, resetBooks } =
  booksSlice.actions;

export default booksSlice.reducer;

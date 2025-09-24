import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BookRow } from "../types/types";

interface BooksState {
  rows: BookRow[]; // current working copy
  originalRows: BookRow[]; // immutable safe copy
  headers: (keyof BookRow)[];
}

const initialState: BooksState = {
  rows: [],
  originalRows: [],
  headers: ["Title", "Author", "Genre", "PublishedYear", "ISBN"],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<BookRow[]>) => {
      state.rows = action.payload;
      state.originalRows = [...action.payload]; // deep safe copy
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

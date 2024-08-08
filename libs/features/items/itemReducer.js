import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firestore } from "../../firebase/config";
import {
  doc,
  addDoc,
  getDocs,
  setDoc,
  collection,
  updateDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (userId, thunkAPI) => {
    try {
      console.log("items fetched");
      return await getItems(userId);
    } catch (err) {
      console.log("🚀 ~ err:", err);
      console.log(err.response);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const postItem = createAsyncThunk(
  "items/postItem",
  async (data, thunkAPI) => {
    try {
      return await addItem(data);
    } catch (err) {
      console.log(err.response);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const removeItem = createAsyncThunk(
  "items/removeItem",
  async (data, thunkAPI) => {
    try {
      return await deleteItem(data);
    } catch (err) {
      console.log(err.response);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const itemSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    isLoading: false,
    status: null,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state, action) => {
      state.status = "pending";
      state.isLoading = true;
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
      state.isLoading = false;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.status = "rejected";
    });
    builder.addCase(postItem.pending, (state, action) => {
      state.status = "pending";
      state.isLoading = true;
    });
    builder.addCase(postItem.fulfilled, (state, action) => {
      state.status = "success";
      state.isLoading = false;
    });
    builder.addCase(postItem.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export const itemReducer = itemSlice.reducer;

const getItems = async (userId) => {
  const inventory = [];
  const q = query(
    collection(firestore, "items"),
    where("userID", "==", userId)
  );
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => {
    inventory.push({ id: doc.id, ...doc.data() });
  });
  return inventory;
};

const addItem = async (body) => {
  const data = await addDoc(collection(firestore, "items"), body);
  return data;
};

const deleteItem = async (body) => {
  await deleteDoc(doc(firestore, "items", body));
};

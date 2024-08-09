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
  getDoc,
} from "firebase/firestore";

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (userId, thunkAPI) => {
    try {
      console.log("items fetched");
      return await getItems(userId);
    } catch (err) {
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

export const updateItem = createAsyncThunk(
  "items/updateItem",
  async (data, thunkAPI) => {
    try {
      return await editItem(data);
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
    item: {},
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
    builder.addCase(updateItem.pending, (state, action) => {
      state.status = "pending";
      state.isLoading = true;
    });
    builder.addCase(updateItem.fulfilled, (state, action) => {
      state.status = "success";
      state.isLoading = false;
      state.item = action.payload;
    });
    builder.addCase(updateItem.rejected, (state, action) => {
      state.status = "rejected";
      state.isLoading = false;
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

const editItem = async (body) => {
  const { userId, id, data } = body;
  const itemDocRef = doc(firestore, "items", id);

  // Fetch the document to ensure it exists and matches the userId
  const itemDocSnap = await getDoc(itemDocRef);

  if (itemDocSnap.exists() && itemDocSnap.data().userID === userId) {
    console.log("Document updated successfully");
    // Update the document with new data
    return await updateDoc(itemDocRef, data);
  } else {
    console.log("No matching document found or userID does not match");
  }
};

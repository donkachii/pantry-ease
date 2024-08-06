"use client";
import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
  IconButton,
  Popover,
  MenuItem,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import PageContainer from "../components/container/PageContainer";
import ProductPerfomance from "../components/dashboard/ProductPerformance";
import { Add } from "@mui/icons-material";
import { firestore } from "../../../libs/firebase/config";
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
import DatePicker from "../../../components/DatePicker";

const Items = () => {
  const [openModal, setOpenModal] = useState(false);
  const [allItems, setAllItems] = useState([]);
  const [data, setData] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [open, setOpen] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleAddFormChange = (e) => {
    const { id, value } = e.target;
    setData((data) => ({ ...data, [id]: value }));
  };

  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  const updateItems = async () => {
    const pantryItems = [];

    const q = query(
      collection(firestore, "items"),
      where("userID", "==", user.uid)
    );

    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      pantryItems.push({ id: doc.id, ...doc.data() });
    });
    setAllItems(pantryItems);
  };

  const addItem = async (e) => {
    e.preventDefault();
    if (
      data.item !== "" &&
      data.category !== "" &&
      data.quantity !== "" &&
      selectedDate !== ""
    ) {
      await addDoc(collection(firestore, "items"), {
        item: data.item.trim(),
        category: data.category.trim(),
        quantity: parseInt(data.quantity),
        expiryDate: selectedDate,
        userID: user.uid,
        createdAt: serverTimestamp(),
      });
      setData({
        item: "",
        category: "",
        quantity: "",
        expiryDate: "",
        userID: "",
        createdAt: "",
      });
      handleCloseModal();
      await updateItems();
    }
  };

  const deleteItems = async (id) => {
    await deleteDoc(doc(firestore, "items", id));
    await updateItems();
  };

  useEffect(() => {
    updateItems();
  }, []);

  console.log("sdkjbgivcujdsbviusd", allItems);

  return (
    <PageContainer title="Item Lists" description="this is List Items">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Item Lists</Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleOpenModal}
        >
          New Item
        </Button>
      </Stack>
      {allItems && allItems.length !== 0 ? (
        <Box mt={3}>
          <ProductPerfomance
            addItem={addItem}
            allItems={allItems}
            openModal={openModal}
            open={open}
            handleCloseModal={handleCloseModal}
            handleAddFormChange={handleAddFormChange}
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            deleteItems={deleteItems}
            handleOpenMenu={handleOpenMenu}
            handleCloseMenu={handleCloseMenu}
          />
        </Box>
      ) : (
        <p>Not Items in the Pantry</p>
      )}
      {/* TODO: Adding Items to the pantry */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add an Item</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                id="item"
                label="New Item"
                variant="outlined"
                onChange={handleAddFormChange}
              />

              {/* TODO: make select suggested */}
              <TextField
                required
                id="category"
                label="Category"
                variant="outlined"
                onChange={handleAddFormChange}
              />

              {/* <TextField
                  id="filled-select-currency"
                  required
                  select
                  label="Select a Category"
                  defaultValue="EUR"
                  helperText="Please select your category"
                  variant="filled"
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField> */}
              <TextField
                required
                id="quantity"
                label="Quantity"
                type="number"
                onChange={handleAddFormChange}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />

              <DatePicker
                label="Expiry Date"
                value={selectedDate}
                name="expiryDate"
                onChange={handleDateChange}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={addItem} autoFocus>
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default Items;

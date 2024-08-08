"use client";
import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import PageContainer from "./PageContainer";
import ProductPerfomance from "./ProductPerformance";
import { Add } from "@mui/icons-material";
import { firestore } from "../libs/firebase/config";
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
import DatePicker from "./DatePicker";
import UpdateForm from "./UpdateForm";
import AddForm from "./AddForm";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch, useAppStore } from "../libs/hooks";
import {
  fetchItems,
  postItem,
  removeItem,
} from "../libs/features/items/itemReducer";
import Loading from "../app/dashboard/loading";

const Items = ({ session }) => {
  const [openModal, setOpenModal] = useState(false);
  const [allItems, setAllItems] = useState([]);
  const [data, setData] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [open, setOpen] = useState(null);
  const [dropDownId, setDropdownId] = useState("");

  //   const user = JSON.parse(localStorage.getItem("user"));
  const router = useRouter();
  const { isLoading, status, items } = useAppSelector((state) => state);
  console.log("🚀 ~ Items ~ isLoading:", status);
  const dispatch = useAppDispatch();

  const user = JSON.parse(session);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
    setDropdownId(event.target.parentElement.parentElement.parentElement.id);
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

  const addItem = async (e) => {
    e.preventDefault();
    if (
      data.item !== "" &&
      data.category !== "" &&
      data.quantity !== "" &&
      selectedDate !== ""
    ) {
      dispatch(
        postItem({
          item: data.item.trim(),
          category: data.category.trim(),
          quantity: parseInt(data.quantity),
          expiryDate: selectedDate,
          userID: user.uid,
          createdAt: serverTimestamp(),
        })
      );

      setData({
        item: "",
        category: "",
        quantity: "",
        expiryDate: "",
        userID: "",
        createdAt: "",
      });
      setSelectedDate("");
      handleCloseModal();
      dispatch(fetchItems(user.uid));
    }
  };

  const deleteItems = async () => {
    dispatch(removeItem(dropDownId));
    dispatch(fetchItems(user.uid));
    handleCloseMenu();
  };

  useEffect(() => {
    dispatch(fetchItems(user.uid));
  }, [dispatch, user.uid]);

  useEffect(() => {
    if (!user.uid) {
      router.push("/");
    }
  }, [user.uid, router]);

  return (
    <PageContainer title="Inventory" description="this is List Items">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Inventory</Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleOpenModal}
        >
          New Item
        </Button>
      </Stack>
      {isLoading && (
        <>
          <p>Loading....</p>
          <Loading />
        </>
      )}
      {items && items.length !== 0 ? (
        <Box mt={3}>
          <ProductPerfomance
            addItem={addItem}
            allItems={items}
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
        !isLoading && status === "success" && <p>No Items in the Pantry</p>
      )}
      {/* TODO: Adding Items to the pantry */}
      {/* <UpdateForm
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleDateChange={handleDateChange}
        handleAddFormChange={handleAddFormChange}
        selectedDate={selectedDate}
        updateItem={addItem}
      /> */}

      <AddForm
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleDateChange={handleDateChange}
        handleAddFormChange={handleAddFormChange}
        selectedDate={selectedDate}
        addItem={addItem}
      />
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

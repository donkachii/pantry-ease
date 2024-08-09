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
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import PageContainer from "./PageContainer";
import ProductPerfomance from "./ProductPerformance";
import { Add } from "@mui/icons-material";
import { firestore } from "../libs/firebase/config";
import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import DatePicker from "./DatePicker";
import UpdateForm from "./UpdateForm";
import AddForm from "./AddForm";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch, useAppStore } from "../libs/hooks";
import {
  fetchItems,
  postItem,
  removeItem,
  updateItem,
} from "../libs/features/items/itemReducer";
import Loading from "../app/dashboard/loading";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  // padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Items = ({ session }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setUpdateOpenModal] = useState(false);
  const [allItems, setAllItems] = useState([]);
  const [data, setData] = useState({});
  const [updateData, setUpdateData] = useState({
    item: "",
    category: "",
    quantity: "",
    expiryDate: "",
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [open, setOpen] = useState(null);
  const [dropDownId, setDropdownId] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  const { isLoading, status, items } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const user = JSON.parse(session);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleUpdateCloseModal = () => {
    setUpdateOpenModal(false);
    setDropdownId("");
    handleCloseMenu();
  };

  const handleUpdateOpenModal = () => {
    setUpdateOpenModal(true);
  };

  const handleOpenMenu = async (event) => {
    event.preventDefault();
    let dropId = event.target.parentElement.parentElement.parentElement.id;
    setOpen(event.currentTarget);
    setDropdownId(event.target.parentElement.parentElement.parentElement.id);
    const itemDocRef = doc(firestore, "items", dropId);
    const itemDocSnap = await getDoc(itemDocRef);
    const dataItem = itemDocSnap.data();
    setUpdateData({
      item: dataItem.item,
      category: dataItem.category,
      quantity: dataItem.quantity,
      expiryDate: dataItem.expiryDate,
    });
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setDropdownId("");
  };

  const handleAddFormChange = (e) => {
    const { id, value } = e.target;
    setData((data) => ({ ...data, [id]: value }));
  };

  const handleUpdateFormChange = (e) => {
    const { id, value } = e.target;
    setUpdateData((data) => ({ ...data, [id]: value }));
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

  const editItem = async (e) => {
    e.preventDefault();
    const body = {
      userId: user.uid,
      id: dropDownId,
      data: updateData,
    };
    await dispatch(updateItem(body));
    await dispatch(fetchItems(user.uid));
    handleCloseMenu();
    handleUpdateCloseModal();
  };

  const deleteItems = async (e) => {
    e.preventDefault();
    dispatch(removeItem(dropDownId));
    dispatch(fetchItems(user.uid));
    handleCloseMenu();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchItems(user.uid));
  }, [dispatch, user.uid]);

  useEffect(() => {
    if (!user.uid) {
      router.push("/");
    }
  }, [user.uid, router]);

  useEffect(() => {
    const filtered = items.filter(
      (item) =>
        item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchTerm, items]);

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
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={searchTerm}
          onChange={handleSearch}
        />
      </Search>
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
            allItems={filteredItems}
            openModal={openModal}
            open={open}
            handleUpdateOpenModal={handleUpdateOpenModal}
            // handleUpdateFormChange={handleUpdateFormChange}
            // handleUpdateDateChange={handleUpdateDateChange}
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
      {openUpdateModal && (
        <UpdateForm
          openModal={openUpdateModal}
          handleCloseModal={handleUpdateCloseModal}
          handleAddFormChange={handleUpdateFormChange}
          updateData={updateData}
          updateItem={editItem}
        />
      )}
      <AddForm
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleDateChange={handleDateChange}
        handleAddFormChange={handleAddFormChange}
        selectedDate={selectedDate}
        addItem={addItem}
      />
      {/* <Dialog
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

              <TextField
                required
                id="category"
                label="Category"
                variant="outlined"
                onChange={handleAddFormChange}
              />

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
      </Dialog> */}
    </PageContainer>
  );
};

export default Items;

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import DatePicker from "../../../../components/DatePicker";
import React from "react";

const AddForm = ({
  openModal,
  handleCloseModal,
  handleAddFormChange,
  addItem,
}) => {
  return (
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
  );
};

export default AddForm;

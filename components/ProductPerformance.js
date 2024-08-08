import React, { useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  IconButton,
  Popover,
  MenuItem,
} from "@mui/material";
import BaseCard from "./DashboardCard";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import { fDate } from "../utils/format-time";

const ProductPerfomance = ({
  allItems,
  deleteItems,
  open,
  handleOpenMenu,
  handleCloseMenu,
}) => {
  return (
    <BaseCard title="Item Lists">
      <TableContainer
        sx={{
          width: {
            xs: "274px",
            sm: "100%",
          },
        }}
      >
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Item
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Category
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Quantity
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Expiry Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6"></Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allItems.map((item, id) => (
              <>
                <TableRow id={item.id} key={item.id}>
                  <TableCell>
                    <Typography fontSize="15px" fontWeight={500}>
                      {id + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Box>
                        <Typography variant="h6">
                          {item.item.charAt(0).toUpperCase() +
                            item.item.slice(1)}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {item.category.charAt(0).toUpperCase() +
                        item.category.slice(1)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {item.quantity}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">
                      {fDate(item.expiryDate)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={handleOpenMenu}>
                      <IconDotsVertical />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Edit and Delete */}
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        slotProps={{
          paper: { sx: { width: 140 } },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <IconPencil /> Edit
        </MenuItem>

        <MenuItem onClick={deleteItems} sx={{ color: "error.main" }}>
          <IconTrash /> Delete
        </MenuItem>
      </Popover>
    </BaseCard>
  );
};

export default ProductPerfomance;

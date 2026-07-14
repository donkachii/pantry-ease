import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 4, md: 5 },
        bgcolor: "background.default",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1.5}
        >
          <Typography
            sx={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontWeight: 700,
              fontSize: "1.15rem",
              color: "primary.main",
              letterSpacing: "-0.02em",
            }}
          >
            PantryEase
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Know what you have. Waste less. Cook more.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const navItems = [
  { label: "Features", id: "features" },
  { label: "How it works", id: "how-it-works" },
];

function Header() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      const offset = 96;
      const top =
        sectionElement.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        boxShadow: "none",
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: { xs: 1.5, sm: 2 },
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 2, sm: 2.5 },
            py: 0.5,
            minHeight: { xs: 52, sm: 56 },
            borderRadius: "999px",
            bgcolor: "rgba(250, 252, 248, 0.72)",
            backdropFilter: "blur(20px)",
            border: "1px solid",
            borderColor: "rgba(47, 93, 58, 0.12)",
            boxShadow: "0 8px 32px rgba(26, 46, 31, 0.06)",
          }}
        >
          <Typography
            component="a"
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("hero");
            }}
            sx={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(1.15rem, 2.5vw, 1.4rem)",
              color: "primary.main",
              letterSpacing: "-0.02em",
              ml: 0.5,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            PantryEase
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.id}
                color="inherit"
                size="small"
                onClick={() => scrollToSection(item.id)}
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                  px: 1.5,
                  "&:hover": {
                    color: "primary.main",
                    bgcolor: "transparent",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              variant="contained"
              color="primary"
              size="small"
              href="/sign-in"
              sx={{ ml: 1 }}
            >
              Sign in
            </Button>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              aria-label="Open menu"
              onClick={toggleDrawer(true)}
              sx={{ color: "primary.main" }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  width: "min(320px, 85vw)",
                  bgcolor: "background.paper",
                  p: 2,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontWeight: 700,
                    color: "primary.main",
                    fontSize: "1.25rem",
                  }}
                >
                  PantryEase
                </Typography>
                <IconButton
                  aria-label="Close menu"
                  onClick={toggleDrawer(false)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              {navItems.map((item) => (
                <MenuItem
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    color: "text.primary",
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
              <Divider sx={{ my: 2 }} />
              <Button
                variant="contained"
                color="secondary"
                href="/sign-in"
                fullWidth
                sx={{ py: 1.25 }}
              >
                Sign in
              </Button>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;

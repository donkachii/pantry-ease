import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function FinalCTA() {
  return (
    <Box
      component="section"
      className="section-reveal"
      sx={{
        position: "relative",
        py: { xs: 10, md: 14 },
        overflow: "hidden",
        bgcolor: "primary.main",
        color: "primary.contrastText",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 80% at 0% 50%, rgba(198, 217, 58, 0.35), transparent 55%),
            radial-gradient(ellipse 50% 60% at 100% 80%, rgba(198, 217, 58, 0.2), transparent 50%)
          `,
          pointerEvents: "none",
        }}
      />
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={3} alignItems="center" textAlign="center">
          <Typography
            component="h2"
            sx={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontWeight: 600,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              maxWidth: "16ch",
            }}
          >
            Ready to waste less food?
          </Typography>
          <Typography
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.6,
              opacity: 0.88,
              maxWidth: "36ch",
            }}
          >
            Open your pantry in PantryEase and start cooking with confidence.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            href="/sign-in"
            size="large"
            sx={{
              mt: 1,
              px: 4,
              py: 1.5,
              fontSize: "1.05rem",
            }}
          >
            Start free
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

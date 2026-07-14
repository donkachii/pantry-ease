import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const steps = [
  {
    step: "1",
    title: "Sign in",
    body: "Create your account in seconds and open your digital pantry.",
  },
  {
    step: "2",
    title: "Add what you have",
    body: "Log items with quantities and dates — the shelf becomes searchable.",
  },
  {
    step: "3",
    title: "Get alerts & recipes",
    body: "Stay ahead of expirations and cook from ingredients already on hand.",
  },
];

export default function HowItWorks() {
  return (
    <Box
      id="how-it-works"
      component="section"
      className="section-reveal"
      sx={{
        position: "relative",
        py: { xs: 10, md: 14 },
        overflow: "hidden",
        background: `
          radial-gradient(ellipse 50% 40% at 100% 0%, rgba(198, 217, 58, 0.2), transparent 50%),
          linear-gradient(180deg, #E4EBE0 0%, #F3F6F1 100%)
        `,
      }}
    >
      <Box className="landing-grain" aria-hidden sx={{ opacity: 0.25 }} />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack
          spacing={1.5}
          sx={{ mb: { xs: 6, md: 8 }, maxWidth: 480, mx: "auto", textAlign: "center" }}
        >
          <Typography
            component="h2"
            sx={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontWeight: 600,
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              letterSpacing: "-0.02em",
              color: "text.primary",
              lineHeight: 1.15,
            }}
          >
            How it works
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: "1.05rem", lineHeight: 1.6 }}>
            From empty shelf to smarter cooking in three steps.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: { xs: 4, md: 3 },
            position: "relative",
          }}
        >
          <Box
            aria-hidden
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              top: 36,
              left: "16%",
              right: "16%",
              height: 2,
              background:
                "linear-gradient(90deg, transparent, rgba(47, 93, 58, 0.25), transparent)",
              zIndex: 0,
            }}
          />
          {steps.map((item) => (
            <Stack
              key={item.step}
              spacing={2}
              alignItems="center"
              textAlign="center"
              sx={{ position: "relative", zIndex: 1 }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  color: "secondary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontWeight: 700,
                  fontSize: "1.35rem",
                  boxShadow: "0 8px 24px rgba(47, 93, 58, 0.25)",
                }}
              >
                {item.step}
              </Box>
              <Typography
                component="h3"
                sx={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontWeight: 600,
                  fontSize: "1.35rem",
                  color: "text.primary",
                }}
              >
                {item.title}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ lineHeight: 1.65, maxWidth: "26ch" }}
              >
                {item.body}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

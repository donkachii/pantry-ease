import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const features = [
  {
    number: "01",
    title: "Live inventory",
    body: "Know exactly what is on the shelf — quantities update as you cook and restock.",
  },
  {
    number: "02",
    title: "Expiry alerts",
    body: "Get nudged before food turns so you use it in time, not toss it later.",
  },
  {
    number: "03",
    title: "Cook from what you have",
    body: "Recipe ideas built from ingredients already in your pantry — less waste, more dinner.",
  },
];

export default function Features() {
  return (
    <Box
      id="features"
      component="section"
      className="section-reveal"
      sx={{
        position: "relative",
        py: { xs: 10, md: 14 },
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ mb: { xs: 6, md: 8 }, maxWidth: 520 }}>
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
            Your kitchen, finally organized
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: "1.05rem", lineHeight: 1.6 }}>
            Three quiet habits that keep food from disappearing into the bin.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: { xs: 5, md: 6 },
            alignItems: "start",
          }}
        >
          {features.map((feature, index) => (
            <Box
              key={feature.number}
              sx={{
                position: "relative",
                borderTop: { xs: index === 0 ? "none" : "1px solid", md: "none" },
                borderColor: "divider",
                pt: {
                  xs: index === 0 ? 0 : 4,
                  md: index === 1 ? 4 : index === 2 ? 8 : 0,
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "secondary.dark",
                  mb: 1.5,
                  letterSpacing: "0.04em",
                }}
              >
                {feature.number}
              </Typography>
              <Typography
                component="h3"
                sx={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontWeight: 600,
                  fontSize: "1.5rem",
                  color: "primary.main",
                  mb: 1.25,
                  letterSpacing: "-0.01em",
                }}
              >
                {feature.title}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ lineHeight: 1.65, maxWidth: "28ch" }}
              >
                {feature.body}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

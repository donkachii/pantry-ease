import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function PantryVignette() {
  const items = [
    { name: "Oat milk", qty: "2 cartons", status: "Fresh", tone: "ok" },
    { name: "Basil", qty: "1 bunch", status: "3 days", tone: "warn" },
    { name: "Chickpeas", qty: "3 cans", status: "Fresh", tone: "ok" },
    { name: "Yogurt", qty: "1 tub", status: "Tomorrow", tone: "alert" },
  ];

  return (
    <Box
      className="hero-reveal hero-reveal-5"
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 480,
        mx: "auto",
        mt: { xs: 5, md: 0 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: "-12% -8%",
          borderRadius: "40% 60% 55% 45%",
          background:
            "radial-gradient(circle at 30% 40%, rgba(198, 217, 58, 0.45), transparent 55%), radial-gradient(circle at 70% 60%, rgba(47, 93, 58, 0.2), transparent 50%)",
          filter: "blur(8px)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          bgcolor: "rgba(250, 252, 248, 0.92)",
          borderRadius: 4,
          border: "1px solid",
          borderColor: "rgba(47, 93, 58, 0.14)",
          boxShadow: "0 24px 64px rgba(26, 46, 31, 0.12)",
          overflow: "hidden",
          p: { xs: 2.5, sm: 3 },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          sx={{ mb: 2.5 }}
        >
          <Typography
            sx={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontWeight: 600,
              fontSize: "1.35rem",
              color: "text.primary",
            }}
          >
            Your pantry
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              bgcolor: "rgba(198, 217, 58, 0.35)",
              px: 1.25,
              py: 0.4,
              borderRadius: 999,
            }}
          >
            4 items
          </Typography>
        </Stack>
        <Stack spacing={1.5}>
          {items.map((item) => (
            <Box
              key={item.name}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                py: 1.25,
                px: 1.5,
                borderRadius: 2,
                bgcolor:
                  item.tone === "alert"
                    ? "rgba(198, 100, 58, 0.08)"
                    : item.tone === "warn"
                      ? "rgba(198, 217, 58, 0.18)"
                      : "rgba(47, 93, 58, 0.05)",
              }}
            >
              <Box>
                <Typography
                  sx={{ fontWeight: 600, fontSize: "0.95rem", color: "text.primary" }}
                >
                  {item.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.qty}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  color:
                    item.tone === "alert"
                      ? "#A84B28"
                      : item.tone === "warn"
                        ? "#6B7A1A"
                        : "primary.main",
                  whiteSpace: "nowrap",
                }}
              >
                {item.status}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={{
        position: "relative",
        width: "100%",
        minHeight: { xs: "auto", md: "100svh" },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: `
          radial-gradient(ellipse 80% 60% at 10% 20%, rgba(198, 217, 58, 0.28), transparent 55%),
          radial-gradient(ellipse 70% 50% at 90% 10%, rgba(47, 93, 58, 0.18), transparent 50%),
          radial-gradient(ellipse 60% 40% at 50% 100%, rgba(47, 93, 58, 0.1), transparent 45%),
          linear-gradient(180deg, #E8EFE4 0%, #F3F6F1 45%, #F3F6F1 100%)
        `,
        pt: { xs: 12, sm: 14 },
        pb: { xs: 8, sm: 10 },
      }}
    >
      <Box className="landing-grain" aria-hidden />
      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 1, width: "100%" }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
            gap: { xs: 2, md: 6 },
            alignItems: "center",
          }}
        >
          <Stack spacing={2.5} sx={{ maxWidth: 560 }}>
            <Typography
              className="hero-reveal hero-reveal-1"
              component="p"
              sx={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(2.75rem, 8vw, 4.75rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "primary.main",
                m: 0,
              }}
            >
              PantryEase
            </Typography>
            <Typography
              className="hero-reveal hero-reveal-2"
              component="h1"
              sx={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(1.35rem, 3.5vw, 1.85rem)",
                lineHeight: 1.3,
                color: "text.primary",
                maxWidth: "18ch",
              }}
            >
              Waste less. Cook with what you already have.
            </Typography>
            <Typography
              className="hero-reveal hero-reveal-3"
              color="text.secondary"
              sx={{
                fontSize: "clamp(1rem, 2vw, 1.125rem)",
                lineHeight: 1.6,
                maxWidth: "36ch",
              }}
            >
              Track quantities, catch expirations before they hit the bin, and
              get recipe ideas from what&apos;s already in your pantry.
            </Typography>
            <Stack
              className="hero-reveal hero-reveal-4"
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ pt: 1 }}
            >
              <Button
                variant="contained"
                color="secondary"
                href="/sign-in"
                size="large"
                sx={{
                  px: 3.5,
                  py: 1.35,
                  fontSize: "1rem",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 24,
                    right: 24,
                    bottom: 8,
                    height: 2,
                    bgcolor: "transparent",
                    transition: "background-color 0.2s ease",
                  },
                  "&:hover::after": {
                    bgcolor: "primary.dark",
                  },
                }}
              >
                Start free
              </Button>
              <Button
                variant="text"
                color="primary"
                href="#how-it-works"
                size="large"
                sx={{
                  px: 2,
                  fontWeight: 600,
                  "&:hover": { bgcolor: "transparent", color: "primary.dark" },
                }}
              >
                See how it works
              </Button>
            </Stack>
          </Stack>
          <PantryVignette />
        </Box>
      </Container>
    </Box>
  );
}

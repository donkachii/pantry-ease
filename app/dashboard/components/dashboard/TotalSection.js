import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import Image from "next/image";

import user1 from "../../../../public/assets/images/backgrounds/u2.jpg";
import user2 from "../../../../public/assets/images/backgrounds/u3.jpg";
import user3 from "../../../../public/assets/images/backgrounds/u4.jpg";

const sections = [
  {
    title: "Total Items",
    subtitle: 20,
    bgColor: "primary.light",
    color: "#fff",
    size: "45px",
  },
  {
    title: "Total Categories",
    subtitle: 2,
    bgColor: "secondary.light",
    color: "#fff",
    size: "45px",
  },
  {
    title: "Items expired",
    subtitle: 8,
    bgColor: "error.light",
    color: "#fff",
    size: "45px",
  },
  {
    title: "Items expiring within 90 days",
    subtitle: 6,
    bgColor: "#14a37f",
    color: "#fff",
    size: "45px",
  },
  {
    title: "Items expiring within 90 days",
    subtitle: 6,
    bgColor: "#b26500",
    color: "#fff",
    size: "45px",
  },
  {
    title: "Make Money by Managing Pantries",
    subtitle: "Coming Soon 😊",
    bgColor: "#b2a300",
    color: "#fff",
    size: "28px",
  },
];

const TotalCard = () => {
  return (
    <Grid container spacing={3}>
      {sections.map((section, index) => (
        <Grid
          key={index}
          item
          xs={12}
          lg={4}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Card
            sx={{
              p: 0,
              width: "100%",
            }}
          >
            <CardContent
              sx={{
                color: section.color,
                backgroundColor: section.bgColor,
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >
              <Typography variant="h4" fontSize="20px">
                {section.title}
              </Typography>
              <Typography mt={1} fontSize={section.size} fontWeight={600}>
                {section.subtitle}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TotalCard;

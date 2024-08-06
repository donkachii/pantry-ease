"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "./components/container/PageContainer";
// components
// import SalesOverview from "@/app/dashboard/components/dashboard/SalesOverview";
// import DailyActivity from "@/app/dashboard/components/dashboard/DailyActivity";
// import ProductPerformance from "@/app/dashboard/components/dashboard/ProductPerformance";
import BlogCard from "./components/dashboard/Blog";
import TotalCard from "./components/dashboard/TotalSection";

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
        <Grid container spacing={3}>
          {/* ------------------------- row 1 ------------------------- */}
          <Grid item xs={12} lg={12}>
            <TotalCard />
          </Grid>
          <Grid item xs={12} lg={12}>
            <BlogCard />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;

"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "../../../../components/PageContainer";
// components
// import SalesOverview from "@/app/dashboard/components/dashboard/SalesOverview";
// import DailyActivity from "@/app/dashboard/components/dashboard/DailyActivity";
// import ProductPerformance from "@/app/dashboard/components/dashboard/ProductPerformance";
import BlogCard from "./Blog";
import TotalCard from "./TotalSection";
import { useEffect } from "react";
import {
  useAppSelector,
  useAppDispatch,
  useAppStore,
} from "../../../../libs/hooks";
import { fetchItems } from "../../../../libs/features/items/itemReducer";

const DashboardPage = ({ session }) => {
  const { isLoading, status, items } = useAppSelector((state) => state);
  console.log("🚀 ~ Items ~ isLoading:", items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems(session.uid));
  }, [dispatch, session]);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
        <Grid container spacing={3}>
          {/* ------------------------- row 1 ------------------------- */}
          <Grid item xs={12} lg={12}>
            <TotalCard items={items} />
          </Grid>
          <Grid item xs={12} lg={12}>
            <BlogCard />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default DashboardPage;

// import { Helmet } from 'react-helmet';
import { Container } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";

const PageContainer = ({ title, description, children }) => (
  <HelmetProvider>
    <Container>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {children}
    </Container>
  </HelmetProvider>
);

export default PageContainer;

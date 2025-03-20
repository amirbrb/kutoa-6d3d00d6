import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import styles from "./NotFound.module.css";
import { SystemRoutes } from "@/modules/routing/routing.types";
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageWrapper>
        <div className={styles.page}>
          <h1>404</h1>
          <p>Oops! Page not found</p>
          <Link to={SystemRoutes.Home}>
            Return to Home
          </Link>
      </div>
    </PageWrapper>
  );
};

export default NotFound;

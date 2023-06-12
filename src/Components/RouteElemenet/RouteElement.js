import GlobalStyle from "../../globalStyles";
import { PhaseBanner } from "govuk-react";
import CookieConsent from "react-cookie-consent";
import Footer from "../Footer/Footer";
import { NavbarComponent } from "../Navbar/NavbarComponent"; 
import { useAuth } from "../Auth/auth";

/**
 * Adds the navigation bar and footer to the component
 * @author @AdamLogan12
 * @prop { Components } [PageToLoad] The component which is to be dsiplayed
 */
export const RouteElement = ({ PageToLoad }) => {
    const [loggedIn] = useAuth();
    return (
        <>
        <GlobalStyle />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PhaseBanner level="POC">
            SSSP is currently a proof of concept{" "}
          </PhaseBanner>
        </div>
        <NavbarComponent />
        <CookieConsent
          buttonStyle={{ backgroundColor: "#00823B", color: "white" }}
        >
          This website uses cookies to enhance the user experience.
        </CookieConsent>
        <PageToLoad />
        <Footer />
      </>
    );
  };
import "./App.css";
import {NavbarComponent} from "./Components/Navbar/NavbarComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {HomePage} from "./Pages/HomePage"
import GlobalStyle from "./globalStyles";
import Footer from "./Components/Footer/Footer";
import CookieConsent from "react-cookie-consent";
import "bootstrap/dist/css/bootstrap.min.css";
import { EnterCompanyRegistrationNumber } from "./Components/FormStages/Company/EnterCompanyRegistrationNumber";
import { AssociateContact } from "./Components/FormStages/Company/AssociateContact";
import { LinkAccount } from "./Components/FormStages/Company/LinkAccount";
import { CitizenRegistrationLandingPage } from "./Components/FormStages/Citizen/CitizenRegistrationLandingPage";
import { EnterCitizenName } from "./Components/FormStages/Citizen/DataEntry/EnterCitizenName";
import { EnterCitizenAddress } from "./Components/FormStages/Citizen/DataEntry/EnterCitizenAddress";
import { EnterCitizenEmail } from "./Components/FormStages/Citizen/DataEntry/EnterCitizenEmail";
import { EnterCitizenPassword } from "./Components/FormStages/Citizen/DataEntry/EnterCitizenPassword";
import { CitizenRegistrationSummary } from "./Components/FormStages/Citizen/CitizenRegistrationSummary";
import { ChangeFirstName } from "./Components/FormStages/Citizen/Change/ChangeFirstName";
import { ChangeLastName } from "./Components/FormStages/Citizen/Change/ChangeLastName";
import { ChangeAddressLine1 } from "./Components/FormStages/Citizen/Change/ChangeAddressLine1";
import { ChangeAddressLine2 } from "./Components/FormStages/Citizen/Change/ChangeAddressLine2";
import { ChangeTownCity } from "./Components/FormStages/Citizen/Change/ChangeTownCity";
import { ChangePostcode } from "./Components/FormStages/Citizen/Change/ChangePostcode";
import { ChangeEmail } from "./Components/FormStages/Citizen/Change/ChangeEmail";
import { CompanyRegistrationLandingPage } from "./Components/FormStages/Company/CompanyRegistrationLandingPage";
import { CompanyRegistrationSummary } from "./Components/FormStages/Company/CompanyRegistrationSummary";
import { EnterCompanyDetails } from "./Components/FormStages/Company/EnterCompanyDetails";
import { CitizenSignIn } from "./Components/FormStages/Citizen/DataEntry/CitizenSignIn";
import { useAuth } from "./Components/Auth/auth";
import { EOIContactInfo } from "./Components/FormStages/Scheme/EOI-Contact-Info";
import { EOIProductInfo } from "./Components/FormStages/Scheme/EOI-Product-Info";
import { EOIDeclarations } from "./Components/FormStages/Scheme/EOI-Declarations";
import { EOISummary } from "./Components/FormStages/Scheme/EOI-Summary";
import { ListSchemes } from "./Components/FormStages/Scheme/List-Schemes";

export default function App() {
  const [loggedIn] = useAuth();
  return (
    <div>
      <Router>
        <GlobalStyle />
        <NavbarComponent />
        <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>

        {loggedIn ?
          <Routes>

            <Route path="/" element={<HomePage />} />

            <Route path="/register-company" element={<EnterCompanyDetails />} />
            <Route
              path="/register-company-registration-number"
              element={<EnterCompanyRegistrationNumber />}
            />
            <Route
              path="/register-company-associated-contact"
              element={<AssociateContact />}
            />
            <Route
              path="/register-company-summary"
              element={<CompanyRegistrationSummary />}
            />
            <Route path="/link-account" element={<LinkAccount />} />
            <Route path="/register-company-landing" element={<CompanyRegistrationLandingPage />} />
            <Route path="/change-first-name" element={<ChangeFirstName />} />
            <Route path="/change-last-name" element={<ChangeLastName />} />
            <Route path="/change-address-line-1" element={<ChangeAddressLine1 />} />
            <Route path="/change-address-line-2" element={<ChangeAddressLine2 />} />
            <Route path="/change-town-city" element={<ChangeTownCity />} />
            <Route path="/change-postcode" element={<ChangePostcode />} />
            <Route path="/EOI-Contact-Info" element={<EOIContactInfo />} />
            <Route path="/EOI-Product-Info" element={<EOIProductInfo />} />
            <Route path="/EOI-Declarations" element={<EOIDeclarations />} />
            <Route path="/EOI-Summary" element={<EOISummary />} />
            <Route path="/List-Schemes" element={<ListSchemes />} />

            <Route path="/change-email-address" element={<ChangeEmail />} />
          </Routes>

          :

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register-citizen-landing" element={<CitizenRegistrationLandingPage />} />
            <Route path="/sign-in-citizen" element={<CitizenSignIn />} />
            <Route path="/register-citizen-name" element={<EnterCitizenName />} />
            <Route path="/register-citizen-address" element={<EnterCitizenAddress />} />
            <Route path="/register-citizen-email" element={<EnterCitizenEmail />} />
            <Route path="/register-citizen-password" element={<EnterCitizenPassword />} />
            <Route path="/register-citizen-summary" element={<CitizenRegistrationSummary />} />
            <Route path="/EOI-Contact-Info" element={<EOIContactInfo />} />
            <Route path="/EOI-Product-Info" element={<EOIProductInfo />} />
            <Route path="/EOI-Declarations" element={<EOIDeclarations />} />
            <Route path="/EOI-Summary" element={<EOISummary />} />
            <Route path="/List-Grants" element={<EOISummary />} />


          </Routes>}
        <Footer />
      </Router>
    </div>
  );
}

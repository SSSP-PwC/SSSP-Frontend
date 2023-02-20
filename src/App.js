import "./App.css";
import Navbar from "./components/navbar/NavbarComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {HomePage} from "./components/pages/HomePage"
import GlobalStyle from "./globalStyles";
import Footer from "./components/footer/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import { EnterCompanyRegistrationNumber } from "./components/formStages/company/EnterCompanyRegistrationNumber";
import { AssociateContact } from "./components/formStages/company/AssociateContact";
import { LinkAccount } from "./components/formStages/company/LinkAccount";
import { CitizenRegistrationLandingPage } from "./components/formStages/citizen/CitizenRegistrationLandingPage";
import { EnterCitizenName } from "./components/formStages/citizen/dataEntry/EnterCitizenName";
import { EnterCitizenAddress } from "./components/formStages/citizen/dataEntry/EnterCitizenAddress";
import { EnterCitizenEmail } from "./components/formStages/citizen/dataEntry/EnterCitizenEmail";
import { EnterCitizenPassword } from "./components/formStages/citizen/dataEntry/EnterCitizenPassword";
import { CitizenRegistrationSummary } from "./components/formStages/citizen/CitizenRegistrationSummary";
import { ChangeFirstName } from "./components/formStages/citizen/change/ChangeFirstName";
import { ChangeLastName } from "./components/formStages/citizen/change/ChangeLastName";
import { ChangeAddressLine1 } from "./components/formStages/citizen/change/ChangeAddressLine1";
import { ChangeAddressLine2 } from "./components/formStages/citizen/change/ChangeAddressLine2";
import { ChangeTownCity } from "./components/formStages/citizen/change/ChangeTownCity";
import { ChangePostcode } from "./components/formStages/citizen/change/ChangePostcode";
import { ChangeEmail } from "./components/formStages/citizen/change/ChangeEmail";
import { CompanyRegistrationLandingPage } from "./components/formStages/company/CompanyRegistrationLandingPage";
import { CompanyRegistrationSummary } from "./components/formStages/company/CompanyRegistrationSummary";
import { EnterCompanyDetails } from "./components/formStages/company/EnterCompanyDetails";
import { CitizenSignIn } from "./components/formStages/citizen/dataEntry/CitizenSignIn";
import { useAuth } from "./components/auth/auth";

export default function App() {
  const [loggedIn] = useAuth();
  return (
    <div>
      <Router>
        <GlobalStyle />
        <Navbar />
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
          </Routes>}
        <Footer />
      </Router>
    </div>
  );
}

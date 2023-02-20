import "./App.css";
import NavbarComponent from "./Components/navbar/NavbarComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {HomePage} from "./Components/pages/HomePage"
import GlobalStyle from "./globalStyles";
import Footer from "./Components/footer/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import { EnterCompanyRegistrationNumber } from "./Components/formStages/company/EnterCompanyRegistrationNumber";
import { AssociateContact } from "./Components/formStages/company/AssociateContact";
import { LinkAccount } from "./Components/formStages/company/LinkAccount";
import { CitizenRegistrationLandingPage } from "./Components/formStages/citizen/CitizenRegistrationLandingPage";
import { EnterCitizenName } from "./Components/FormStages/Citizen/DataEntry/EnterCitizenName";
import { EnterCitizenAddress } from "./Components/formStages/citizen/dataEntry/EnterCitizenAddress";
import { EnterCitizenEmail } from "./Components/formStages/citizen/dataEntry/EnterCitizenEmail";
import { EnterCitizenPassword } from "./Components/formStages/citizen/dataEntry/EnterCitizenPassword";
import { CitizenRegistrationSummary } from "./Components/formStages/citizen/CitizenRegistrationSummary";
import { ChangeFirstName } from "./Components/formStages/citizen/change/ChangeFirstName";
import { ChangeLastName } from "./Components/formStages/citizen/change/ChangeLastName";
import { ChangeAddressLine1 } from "./Components/formStages/citizen/change/ChangeAddressLine1";
import { ChangeAddressLine2 } from "./Components/formStages/citizen/change/ChangeAddressLine2";
import { ChangeTownCity } from "./Components/formStages/citizen/change/ChangeTownCity";
import { ChangePostcode } from "./Components/formStages/citizen/change/ChangePostcode";
import { ChangeEmail } from "./Components/formStages/citizen/change/ChangeEmail";
import { CompanyRegistrationLandingPage } from "./Components/formStages/company/CompanyRegistrationLandingPage";
import { CompanyRegistrationSummary } from "./Components/formStages/company/CompanyRegistrationSummary";
import { EnterCompanyDetails } from "./Components/formStages/company/EnterCompanyDetails";
import { CitizenSignIn } from "./Components/formStages/citizen/dataEntry/CitizenSignIn";
import { useAuth } from "./Components/auth/auth";

export default function App() {
  const [loggedIn] = useAuth();
  return (
    <div>
      <Router>
        <GlobalStyle />
        <NavbarComponent />
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

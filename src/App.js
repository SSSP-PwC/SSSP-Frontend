import "./App.css";
import LoginForm from "./Components/Auth/LoginForm";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import GlobalStyle from "./globalStyles";
import Footer from "./Components/Footer/Footer";
import { SignUpForm } from "./Components/Auth/SignUpForm";
import { CompanySignUpForm } from "./Components/Auth/CompanySignUpForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { EnterCompanyName } from "./Components/FormStages/Company/EnterCompanyName";
import { EnterCompanyAddress } from "./Components/FormStages/Company/EnterCompanyAddress";
import { EnterCompanyRegistrationNumber } from "./Components/FormStages/Company/EnterCompanyRegistrationNumber";
import { AssociateContact } from "./Components/FormStages/Company/AssociateContact";
import { LinkAccount } from "./Components/FormStages/Company/LinkAccount";
import { CitizenRegistrationLandingPage } from "./Components/FormStages/Citizen/CitizenRegistrationLandingPage";
import { EnterCitizenName } from "./Components/FormStages/Citizen/EnterCitizenName";
import { EnterCitizenAddress } from "./Components/FormStages/Citizen/EnterCitizenAddress";
import { EnterCitizenEmail } from "./Components/FormStages/Citizen/EnterCitizenEmail";
import { EnterCitizenPassword } from "./Components/FormStages/Citizen/EnterCitizenPassword";
import { CitizenRegistrationSummary } from "./Components/FormStages/Citizen/CitizenRegistrationSummary";
import { ChangeFirstName } from "./Components/FormStages/Citizen/ChangeFirstName";
import { ChangeLastName } from "./Components/FormStages/Citizen/ChangeLastName";
export default function App() {
  return (
    <div className="">
      <Router>
        <GlobalStyle />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<CompanySignUpForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/company-name" element={<EnterCompanyName />} />
          <Route path="/company-address" element={<EnterCompanyAddress />} />
          <Route
            path="/company-registration-number"
            element={<EnterCompanyRegistrationNumber />}
          />
          <Route
            path="/company-associated-contact"
            element={<AssociateContact />}
          />
          <Route path="/link-account" element={<LinkAccount />} />
          <Route path="/register-company" element={<CompanySignUpForm />} />
          <Route path="/register-citizen-landing" element={<CitizenRegistrationLandingPage />} />
          <Route path="/register-citizen-name" element={<EnterCitizenName />} />
          <Route path="/register-citizen-address" element={<EnterCitizenAddress />} />
          <Route path="/register-citizen-email" element={<EnterCitizenEmail />} />
          <Route path="/register-citizen-password" element={<EnterCitizenPassword />} />
          <Route path="/register-citizen-summary" element={<CitizenRegistrationSummary />} />
          <Route path="/change-first-name" element={<ChangeFirstName />} />
          <Route path="/change-last-name" element={<ChangeLastName />} />


        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

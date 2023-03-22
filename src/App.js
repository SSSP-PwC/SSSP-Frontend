import "./App.css";
import { NavbarComponent } from "./Components/Navbar/NavbarComponent";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import GlobalStyle from "./globalStyles";
import Footer from "./Components/Footer/Footer";
import CookieConsent from "react-cookie-consent";
import "bootstrap/dist/css/bootstrap.min.css";
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
import { EnterCompanyDetails } from "./Components/FormStages/Company/EnterCompanyDetails";
import { CitizenSignIn } from "./Components/FormStages/Citizen/DataEntry/CitizenSignIn";
import { useAuth } from "./Components/Auth/auth";
import { EOIContactInfo } from "./Components/FormStages/Scheme/EOI-Contact-Info";
import { EOIProductInfo } from "./Components/FormStages/Scheme/EOI-Product-Info";
import { EOIDeclarations } from "./Components/FormStages/Scheme/EOI-Declarations";
import { EOISummary } from "./Components/FormStages/Scheme/EOI-Summary";
import { ListPortals } from "./Components/FormStages/Scheme/ListPortals";
import { GrantApplication } from "./Components/FormStages/Scheme/GrantApplication";
import { RegisterSchemeLandingPage } from "./Components/FormStages/Scheme/Register-Scheme-Landing-Page";
import { SchemeTitle } from "./Components/FormStages/Scheme/Scheme-Title";
import { SchemeDescription } from "./Components/FormStages/Scheme/Scheme-Description";
import { SchemeDates } from "./Components/FormStages/Scheme/Scheme-Dates";
import { SchemeObjectives } from "./Components/FormStages/Scheme/Scheme-Objectives";
import { SchemeEligibilityCriteria } from "./Components/FormStages/Scheme/Scheme-Eligibility-Criteria";
import { SchemeApplicationDetails } from "./Components/FormStages/Scheme/Scheme-Application-Details";
import { SchemePublisherDetails } from "./Components/FormStages/Scheme/Scheme-Publisher-Details";
import { SchemeSummary } from "./Components/FormStages/Scheme/Scheme-Summary";
import { PhaseBanner } from "govuk-react";
import { EligibilityCheckerRegisteredCompany } from "./Components/FormStages/Scheme/Eligibility-Checker-Registered-Company";
import { EligibilityCheckerEmployeeCount } from "./Components/FormStages/Scheme/Eligibility-Checker-Employee-Count";
import { EligibilityCheckerTradingLength } from "./Components/FormStages/Scheme/Eligibility-Checker-Trading-Length";
import { ApplicationFormBuildingInformation } from "./Components/FormStages/Scheme/Application-Form-Building-Information";
import { ApplicationFormExhaustedForm } from "./Components/FormStages/Scheme/Application-Form-Exhausted-Form";
import { ApplicationFormSummaryTable } from "./Components/FormStages/Scheme/Application-Form-Summary-Table";
import { EligibilityCheckerProductInfo } from "./Components/FormStages/Scheme/Eligibility-Checker-Product-Info";
import { EligibilityCheckerSoftwareDetails } from "./Components/FormStages/Scheme/Eligibility-Checker-Software-Details";
import { EligibilityCheckerSummary } from "./Components/FormStages/Scheme/Eligibility-Checker-Summary";
import { SchemeSupportingInformation } from "./Components/FormStages/Scheme/Scheme-Supporting-Information";
import { RegistrationFormLandingPage } from "./Components/FormStages/Scheme/Registration-Form-Landing-Page";
import { RegisterCompanySummary } from "./Components/FormStages/Company/Register-Company-Summary";
import FormBuilder from "./Components/FormStages/Scheme/FormBuilder";
import PageBuilder from "./Components/FormStages/Scheme/PageBuilder";
import DynamicPage from "./Components/FormStages/Scheme/DynamicPage";
import RenderForm from "./Components/FormStages/Scheme/Render-Form";
import RegisterPortal from "./Components/FormStages/Scheme/RegisterPortal";
import PagePreview from "./Components/FormStages/Scheme/PagePreview";
import PersonalProfile from "./Components/FormStages/Citizen/PersonalProfile";
import EditDetails from "./Components/FormStages/Citizen/DataEntry/EditDetails";

export default function App() {
  const [loggedIn] = useAuth();
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
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
                <HomePage />
                <Footer />

              </>
            }
          />

          <Route
            path="/register-company"
            element={
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
                <EnterCompanyDetails />
                <Footer />

              </>
            }
          />
          <>
            <Route path="/:endpoint/pages/:pageId/" element={<DynamicPage />} />
          </>
          <Route
            path="/register-company-associated-contact"
            element={
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

                <AssociateContact />
                <Footer />

              </>
            }
          />
                    <Route
            path="/page-preview"
            element={
              <>
          

                <PagePreview />

              </>
            }
          />
          <Route
            path="/register-company-summary"
            element={
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

                <RegisterCompanySummary />
                <Footer />

              </>
            }
          />
          <Route
            path="/link-account"
            element={
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
                <LinkAccount />
                <Footer />

              </>
            }
          />
          <Route
            path="/register-company-landing"
            element={
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
                <CompanyRegistrationLandingPage />
                <Footer />

              </>
            }
          />
          <Route
            path="/register-company-details"
            element={
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
                <EnterCompanyDetails />
                <Footer />

              </>
            }
          />
          <Route
            path="/change-first-name"
            element={
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
                <ChangeFirstName />
                <Footer />

              </>
            }
          />
          <Route
            path="/change-last-name"
            element={
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

                <ChangeLastName />
                <Footer />

              </>
            }
          />
          <Route
            path="/change-address-line-1"
            element={
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
                <ChangeAddressLine1 />
                <Footer />

              </>
            }
          />

          <Route
            path="/change-address-line-2"
            element={
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
                <ChangeAddressLine2 />
                <Footer />

              </>
            }
          />
          <Route
            path="/change-town-city"
            element={
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
                <ChangeTownCity />
                <Footer />

              </>
            }
          />
          <Route
            path="/change-postcode"
            element={
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
                <ChangePostcode />
                <Footer />

              </>
            }
          />
          <Route
            path="/EOI-Contact-Info"
            element={
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
                <EOIContactInfo />
                <Footer />

              </>
            }
          />
          <Route
            path="/EOI-Product-Info"
            element={
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
                <EOIProductInfo />
                <Footer />

              </>
            }
          />
          <Route
            path="/EOI-Declarations"
            element={
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
                <EOIDeclarations />
                <Footer />

              </>
            }
          />
          <Route
            path="/EOI-Summary"
            element={
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
                <EOISummary />
                <Footer />

              </>
            }
          />
          <Route
            path="/List-Schemes"
            element={
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
                <ListPortals />
                <Footer />

              </>
            }
          />
          <Route
            path="/Grant-Application"
            element={
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

                <GrantApplication />
                <Footer />

              </>
            }
          />
          <Route
            path="/change-email-address"
            element={
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
                <ChangeEmail />
                <Footer />

              </>
            }
          />
          <Route
            path="/publish-scheme-landing"
            element={
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
                <RegisterSchemeLandingPage />
                <Footer />

              </>
            }
          />
          <Route
            path="/publish-scheme-title"
            element={
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
                <SchemeTitle />
                <Footer />

              </>
            }
          />
          <Route
            path="/publish-scheme-dates"
            element={
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
                <SchemeDates />
                <Footer />

              </>
            }
          />
          <Route
            path="/publish-scheme-supporting-information"
            element={
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

                <SchemeSupportingInformation />
                <Footer />

              </>
            }
          />

          <Route
            path="/publish-scheme-objectives"
            element={
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

                <SchemeObjectives />
                <Footer />

              </>
            }
          />

          <Route
            path="/"
            element={
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
                <HomePage />
                <Footer />

              </>
            }
          />
          <Route
            path="/register-citizen-landing"
            element={
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
                <CitizenRegistrationLandingPage />
                <Footer />

              </>
            }
          />
          <Route
            path="/sign-in-citizen"
            element={
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
                <CitizenSignIn />
                <Footer />

              </>
            }
          />
          <Route
            path="/register-citizen-name"
            element={
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
                <EnterCitizenName />
                <Footer />

              </>
            }
          />
          <Route
            path="/register-citizen-address"
            element={
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
                <EnterCitizenAddress />
                <Footer />

              </>
            }
          />
          <Route
            path="/register-citizen-email"
            element={
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

                <EnterCitizenEmail />
                <Footer />

              </>
            }
          />
          <Route
            path="/register-company-details"
            element={
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

                <EnterCompanyDetails />
                <Footer />

              </>
            }
          />
          <Route
            path="/register-company-associated-contact"
            element={
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

                <AssociateContact />
                <Footer />

              </>
            }
          />
          <Route
            path="/register-company-link-account"
            element={
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

                <LinkAccount />
                <Footer />

              </>
            }
          />
          <Route
            path="/register-citizen-password"
            element={
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

                <EnterCitizenPassword />
                <Footer />

              </>
            }
          />
          <Route
            path="/publish-scheme-supporting-information"
            element={
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

                <SchemeSupportingInformation />
                <Footer />

              </>
            }
          />
          <Route
            path="/register-company-summary"
            element={
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

                <RegisterCompanySummary />
                <Footer />

              </>
            }
          />

          <Route
            path="/register-citizen-summary"
            element={
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

                <CitizenRegistrationSummary />
                <Footer />

              </>
            }
          />
          <Route
            path="/EOI-Contact-Info"
            element={
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
                <EOIContactInfo />
                <Footer />

              </>
            }
          />
          <Route
            path="/EOI-Product-Info"
            element={
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
                <EOIProductInfo />
                <Footer />

              </>
            }
          />
          <Route
            path="/EOI-Declarations"
            element={
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

                <EOIDeclarations />
                <Footer />

              </>
            }
          />
          <Route
            path="/EOI-Summary"
            element={
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

                <EOISummary />
                <Footer />

              </>
            }
          />
          <Route
            path="/List-Schemes"
            element={
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

                <ListPortals />
                <Footer />

              </>
            }
          />
          <Route
            path="/Grant-Application"
            element={
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

                <GrantApplication />
                <Footer />

              </>
            }
          />
          <Route
            path="/Eligibility-Checker-Registered-Company"
            element={
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

                <EligibilityCheckerRegisteredCompany />
                <Footer />

              </>
            }
          />
          <Route
            path="/Eligibility-Checker-Employee-Count"
            element={
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
                <EligibilityCheckerEmployeeCount />
                <Footer />

              </>
            }
          />
          <Route
            path="/Eligibility-Checker-Trading-Length"
            element={
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
                <EligibilityCheckerTradingLength />
                <Footer />

              </>
            }
          />
          <Route
            path="/Eligibility-Checker-Selected-Product-Info"
            element={
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

                <EligibilityCheckerProductInfo />
                <Footer />

              </>
            }
          />
          <Route
            path="/Eligibility-Checker-Software-Details"
            element={
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
                <EligibilityCheckerSoftwareDetails />
                <Footer />

              </>
            }
          />
          <Route
            path="/Eligibility-Checker-Summary"
            element={
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
                <EligibilityCheckerSummary />
                <Footer />

              </>
            }
          />

          <Route
            path="/Application-Form-Exhausted-Funds"
            element={
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

                <ApplicationFormExhaustedForm />
                <Footer />

              </>
            }
          />
          <Route
            path="/Application-Form-Building-Information"
            element={
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
                <ApplicationFormBuildingInformation />
                <Footer />

              </>
            }
          />
          <Route
            path="/Application-Form-Summary-Table"
            element={
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

                <ApplicationFormSummaryTable />
                <Footer />

              </>
            }
          />
          <Route
            path="/Page-Builder"
            element={
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
                <PageBuilder />
                <Footer />

              </>
            }
          />
          <Route
            path="/Register-Portal"
            element={
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
                <RegisterPortal />
                <Footer />

              </>
            }
          />
          <Route
            path="/Render-Form"
            element={
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
                <RenderForm />
                <Footer />

              </>
            }
          />
                    <Route
            path="/edit-details"
            element={
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
                <EditDetails />
                <Footer />

              </>
            }
          />

          <Route
            path="/publish-scheme-landing"
            element={
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

                <RegisterSchemeLandingPage />
                <Footer />

              </>
            }
          />
          <Route
            path="/register-company-link-citizen"
            element={
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
                <LinkAccount />
                <Footer />

              </>
            }
          />
               <Route
            path="/personal-profile"
            element={
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
                <PersonalProfile />
                <Footer />

              </>
            }
          />
          <Route
            path="/publish-scheme-title"
            element={
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
                <SchemeTitle />
                <Footer />

              </>
            }
          />
          <Route
            path="/publish-scheme-details"
            element={
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

                <SchemeDescription />
                <Footer />

              </>
            }
          />
          <Route
            path="/publish-scheme-dates"
            element={
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

                <SchemeDates />
                <Footer />

              </>
            }
          />
          <Route
            path="/publish-scheme-objectives"
            element={
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
                <SchemeObjectives />
                <Footer />

              </>
            }
          />
          <Route
            path="/Register-Scheme"
            element={
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
                <FormBuilder />
                <Footer />

              </>
            }
          />
          <Route
            path="/publish-scheme-application-details"
            element={
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

                <SchemeApplicationDetails />
                <Footer />

              </>
            }
          />
          <Route
            path="/register-company-landing"
            element={
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

                <CompanyRegistrationLandingPage />
                <Footer />

              </>
            }
          />
          <Route
            path="/register-company-summary"
            element={
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

                <RegisterCompanySummary />
                <Footer />

              </>
            }
          />
          <Route
            path="/publish-scheme-eligibility-criteria"
            element={
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

                <SchemeEligibilityCriteria />
                <Footer />

              </>
            }
          />
          <Route
            path="/publish-scheme-publisher-details"
            element={
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

                <SchemePublisherDetails />
                <Footer />

              </>
            }
          />

          <Route
            path="/publish-scheme-summary"
            element={
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

                <SchemeSummary />

                <Footer />

              </>
            }
          />
          <Route
            path="/Registration-Form-Landing-Page"
            element={
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

                <RegistrationFormLandingPage />
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

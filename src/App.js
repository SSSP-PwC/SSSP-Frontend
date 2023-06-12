import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
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
import { RegisterNewService } from "./Components/FormStages/Scheme/RegisterService";
import { RegisterExternalService } from "./Components/FormStages/Scheme/RegisterExternal";
import { IframeComponent } from "./Components/FormStages/Scheme/IframeTest";
import { SchemeDescription } from "./Components/FormStages/Scheme/Scheme-Description";
import { ModerateServices } from "./Components/FormStages/Admin/ModerateServices";
import { SchemeDates } from "./Components/FormStages/Scheme/Scheme-Dates";
import { SchemeObjectives } from "./Components/FormStages/Scheme/Scheme-Objectives";
import { SchemeEligibilityCriteria } from "./Components/FormStages/Scheme/Scheme-Eligibility-Criteria";
import { SchemeApplicationDetails } from "./Components/FormStages/Scheme/Scheme-Application-Details";
import { SchemePublisherDetails } from "./Components/FormStages/Scheme/Scheme-Publisher-Details";
import { SchemeSummary } from "./Components/FormStages/Scheme/Scheme-Summary";
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
import PortalCreatorLandingPage from "./Components/FormStages/Scheme/PortalCreatorLandingPage";
import PagePreview from "./Components/FormStages/Scheme/PagePreview";
import PersonalProfile from "./Components/FormStages/Citizen/PersonalProfile";
import EditDetails from "./Components/FormStages/Citizen/DataEntry/EditDetails";
import CallBack from "./Components/FormStages/Citizen/Callback";
import Account from "./Components/FormStages/Citizen/Account";
import DisplayTransactions from "./Components/FormStages/Citizen/DisplayTransactions";
import EmailConfirmed from "./Components/EmailConfirmed";
import { ChangePassword } from "./Components/FormStages/Citizen/ChangePassword";
import { CreateOpenBankingAccount } from "./Components/FormStages/Citizen/CreateOpenBankingAccount";
import LinkWalletAccount from "./Components/FormStages/Citizen/Link-Account";
import { EnterCitizenPhoneNumber } from "./Components/FormStages/Citizen/DataEntry/EnterCitizenPhoneNumber";
import { MFA } from "./Components/FormStages/Citizen/DataEntry/MFA";
import Services from "./Components/FormStages/Citizen/Services";
import EnterPortalDomain from "./Components/FormStages/Scheme/EnterPortalDomain";
import EnterPortalName from "./Components/FormStages/Scheme/EnterPortalName";
import SiteHome from "./Components/FormStages/Scheme/SiteHome";
import InteractivePageBuilderInterface from "./Components/FormStages/Scheme/InteractivePageBuilderInterface";
import { ServiceSent } from "./Components/FormStages/Scheme/ServiceAppSent";
import DynamicList from "./Components/FormStages/Admin/DynamicList";
import EditUserDetails from "./Components/FormStages/Citizen/DataEntry/EditUserDetails";
import { RouteElement } from "./Components/RouteElemenet/RouteElement";
console.log(process.env.REACT_APP_BACKEND_URL)

export default function App() {
  const [loggedIn] = useAuth();
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<RouteElement PageToLoad={HomePage} />}
          />

          <Route
            path="/register-company"
            element={<RouteElement PageToLoad={EnterCompanyDetails} />}
          />

          <Route
            path="/page-builder-interface/"
            element={<RouteElement PageToLoad={InteractivePageBuilderInterface} />}
          />

          <>
            <Route
              path="/digital-services/portal/:endpoint/pages/:pageId/"
              element={<DynamicPage />}
            />
          </>

          <Route
            path="/register-company-associated-contact"
            element={<RouteElement PageToLoad={AssociateContact} />}
          />

          <Route
            path="/register-service"
            element={<RegisterNewService />}
          />

          <Route
            path="/integrated"
            element={<IframeComponent />}
          />

          <Route
            path="/register-sent"
            element={<ServiceSent />}
          />
          
          <Route
            path="/moderate-services"
            element={<RouteElement PageToLoad={ModerateServices} />}
          />

          <Route
            path="/register-external"
            element={<RegisterExternalService />}
          />

          <Route
            path="/page-preview"
            element={<PagePreview />}
          />

          <Route
            path="/register-company-summary"
            element={<RouteElement PageToLoad={RegisterCompanySummary} />}
          />

          <Route
            path="/sign-in-mfa"
            element={<RouteElement PageToLoad={MFA} />}
          />

          <Route
            path="/services"
            element={<RouteElement PageToLoad={Services} />}
          />
          
          <Route
            path="/wallet/callback/"
            element={<RouteElement PageToLoad={CallBack} />}
          />

          <Route
            path={`/edit-user-details`}
            element={<RouteElement PageToLoad={EditUserDetails} />}
          />

          <Route
            path="/wallet/account_transactions/:accountId/:consentToken"
            element={<RouteElement PageToLoad={DisplayTransactions} />}
          />

          <Route
            path="/portal-domain"
            element={<RouteElement PageToLoad={EnterPortalDomain} />}
          />
          
          <Route
            path="/portal-name"
            element={<RouteElement PageToLoad={EnterPortalName} />}
          />

          <Route
            path="/email-confirmed"
            element={<RouteElement PageToLoad={EmailConfirmed} />}
          />

          <Route
            path="/change-password"
            element={<RouteElement PageToLoad={ChangePassword} />}
          />

          <Route
            path="/link-wallet"
            element={<RouteElement PageToLoad={CreateOpenBankingAccount} />}
          />

          <Route
            path="/wallet/link-institution"
            element={<RouteElement PageToLoad={LinkWalletAccount} />}
          />

          <Route
            path="/register-citizen-phone-number"
            element={<RouteElement PageToLoad={EnterCitizenPhoneNumber} />}
          />

          <Route
            path="/administrator-view"
            element={<RouteElement PageToLoad={DynamicList} />}
          />

          <Route
            path="/wallet/account"
            element={<RouteElement PageToLoad={Account} />}
          />

          <Route
            path="/link-account"
            element={<RouteElement PageToLoad={LinkAccount} />}
          />

          <Route
            path="/register-company-landing"
            element={<RouteElement PageToLoad={CompanyRegistrationLandingPage} />}
          />

          <Route
            path="/register-company-details"
            element={<RouteElement PageToLoad={EnterCompanyDetails} />}
          />

          <Route
            path="/change-first-name"
            element={<RouteElement PageToLoad={ChangeFirstName} />}
          />

          <Route
            path="/change-last-name"
            element={<RouteElement PageToLoad={ChangeLastName} />}
          />

          <Route
            path="/change-address-line-1"
            element={<RouteElement PageToLoad={ChangeAddressLine1} />}
          />

          <Route
            path="/change-address-line-2"
            element={<RouteElement PageToLoad={ChangeAddressLine2} />}
          />

          <Route
            path="/change-town-city"
            element={<RouteElement PageToLoad={ChangeTownCity} />}
          />

          <Route
            path="/change-postcode"
            element={<RouteElement PageToLoad={ChangePostcode} />}
          />

          <Route
            path="/EOI-Contact-Info"
            element={<RouteElement PageToLoad={EOIContactInfo} />}
          />

          <Route
            path="/EOI-Product-Info"
            element={<RouteElement PageToLoad={EOIProductInfo} />}
          />

          <Route
            path="/EOI-Declarations"
            element={<RouteElement PageToLoad={EOIDeclarations} />}
          />

          <Route
            path="/EOI-Summary"
            element={<RouteElement PageToLoad={EOISummary} />}
          />

          <Route
            path="/List-Applications"
            element={<RouteElement PageToLoad={ListPortals} />}
          />

          <Route
            path="/Grant-Application"
            element={<RouteElement PageToLoad={GrantApplication} />}
          />

          <Route
            path="/change-email-address"
            element={<RouteElement PageToLoad={ChangeEmail} />}
          />

          <Route
            path="/publish-scheme-landing"
            element={<RouteElement PageToLoad={RegisterSchemeLandingPage} />}
          />

          <Route
            path="/publish-scheme-title"
            element={<RouteElement PageToLoad={SchemeTitle} />}
          />

          <Route
            path="/publish-scheme-dates"
            element={<RouteElement PageToLoad={SchemeDates} />}
          />

          <Route
            path="/publish-scheme-supporting-information"
            element={<RouteElement PageToLoad={SchemeSupportingInformation} />}
          />

          <Route
            path="/publish-scheme-objectives"
            element={<RouteElement PageToLoad={SchemeObjectives} />}
          />

          <Route
            path="/"
            element={<RouteElement PageToLoad={HomePage} />}
          />

          <Route
            path="/register-citizen-landing"
            element={<RouteElement PageToLoad={CitizenRegistrationLandingPage} />}
          />

          <Route
            path="/sign-in-citizen"
            element={<RouteElement PageToLoad={CitizenSignIn} />}
          />

          <Route
            path="/register-citizen-name"
            element={<RouteElement PageToLoad={EnterCitizenName} />}
          />

          <Route
            path="/register-citizen-address"
            element={<RouteElement PageToLoad={EnterCitizenAddress} />}
          />

          <Route
            path="/register-citizen-email"
            element={<RouteElement PageToLoad={EnterCitizenEmail} />}
          />

          <Route
            path="/register-company-details"
            element={<RouteElement PageToLoad={EnterCompanyDetails} />}
          />

          <Route
            path="/register-company-associated-contact"
            element={<RouteElement PageToLoad={AssociateContact} />}
          />

          <Route
            path="/register-company-link-account"
            element={<RouteElement PageToLoad={LinkAccount} />}
          />

          <Route
            path="/register-citizen-password"
            element={<RouteElement PageToLoad={EnterCitizenPassword} />}
          />

          <Route
            path="/publish-scheme-supporting-information"
            element={<RouteElement PageToLoad={SchemeSupportingInformation} />}
          />

          <Route
            path="/register-citizen-summary"
            element={<RouteElement PageToLoad={CitizenRegistrationSummary} />}
          />

          <Route
            path="/Eligibility-Checker-Registered-Company"
            element={<RouteElement PageToLoad={EligibilityCheckerRegisteredCompany} />}
          />

          <Route
            path="/Eligibility-Checker-Employee-Count"
            element={<RouteElement PageToLoad={EligibilityCheckerEmployeeCount} />}
          />

          <Route
            path="/Eligibility-Checker-Trading-Length"
            element={<RouteElement PageToLoad={EligibilityCheckerTradingLength} />}
          />

          <Route
            path="/Eligibility-Checker-Selected-Product-Info"
            element={<RouteElement PageToLoad={EligibilityCheckerProductInfo} />}
          />

          <Route
            path="/Eligibility-Checker-Software-Details"
            element={<RouteElement PageToLoad={EligibilityCheckerSoftwareDetails} />}
          />

          <Route
            path="/Eligibility-Checker-Summary"
            element={<RouteElement PageToLoad={EligibilityCheckerSummary} />}
          />

          <Route
            path="/Application-Form-Exhausted-Funds"
            element={<RouteElement PageToLoad={ApplicationFormExhaustedForm} />}
          />

          <Route
            path="/Application-Form-Building-Information"
            element={<RouteElement PageToLoad={ApplicationFormBuildingInformation} />}
          />

          <Route
            path="/Application-Form-Summary-Table"
            element={<RouteElement PageToLoad={ApplicationFormSummaryTable} />}
          />

          <Route
            path="/Page-Builder"
            element={<RouteElement PageToLoad={PageBuilder} />}
          />

          <Route
            path="/site-home/https://sssp-qa.dj4eixkpal8an.amplifyapp.com/digital-services/portal/"
            element={<RouteElement PageToLoad={SiteHome} />}
          />

          <Route
            path="/portal-creator-landing-page"
            element={<RouteElement PageToLoad={PortalCreatorLandingPage} />}
          />

          <Route
            path="/Render-Form"
            element={<RouteElement PageToLoad={RenderForm} />}
          />

          <Route
            path="/edit-details"
            element={<RouteElement PageToLoad={EditDetails} />}
          />

          <Route
            path="/publish-scheme-landing"
            element={<RouteElement PageToLoad={RegisterSchemeLandingPage} />}
          />

          <Route
            path="/register-company-link-citizen"
            element={<RouteElement PageToLoad={LinkAccount} />}
          />

          <Route
            path="/personal-profile"
            element={<RouteElement PageToLoad={PersonalProfile} />}
          />

          <Route
            path="/publish-scheme-title"
            element={<RouteElement PageToLoad={SchemeTitle} />}
          />

          <Route
            path="/publish-scheme-details"
            element={<RouteElement PageToLoad={SchemeDescription} />}
          />

          <Route
            path="/publish-scheme-dates"
            element={<RouteElement PageToLoad={SchemeDates} />}
          />

          <Route
            path="/publish-scheme-objectives"
            element={<RouteElement PageToLoad={SchemeObjectives} />}
          />

          <Route
            path="/Register-Scheme"
            element={<RouteElement PageToLoad={FormBuilder} />}
          />

          <Route
            path="/publish-scheme-application-details"
            element={<RouteElement PageToLoad={SchemeApplicationDetails} />}
          />

          <Route
            path="/publish-scheme-eligibility-criteria"
            element={<RouteElement PageToLoad={SchemeEligibilityCriteria} />}
          />

          <Route
            path="/publish-scheme-publisher-details"
            element={<RouteElement PageToLoad={SchemePublisherDetails} />}
          />

          <Route
            path="/publish-scheme-summary"
            element={<RouteElement PageToLoad={SchemeSummary} />}
          />

          <Route
            path="/Registration-Form-Landing-Page"
            element={<RouteElement PageToLoad={RegistrationFormLandingPage} />}
          />
        </Routes>
      </Router>
    </>
  );
}

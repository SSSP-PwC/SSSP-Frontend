import { Panel } from "govuk-react";
import React from "react";

const SignUpMessage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "20px" }}>
      <div>
        <Panel
          title="Your account information has been recorded!"
          style={{ backgroundColor: "#00823B" }}
        >
          <br />
          <strong>
            A confirmation email has been sent to the email address provided.
          </strong>
        </Panel>
      </div>
    </div>
  );
};

export default SignUpMessage;

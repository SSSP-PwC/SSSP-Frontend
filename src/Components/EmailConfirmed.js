import { Panel } from "govuk-react";
import React from "react";

const EmailConfirmed = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "20px" }}>
      <div>
        <Panel
          title="Your email has been confirmed!"
          style={{ backgroundColor: "#00823B" }}
        >
          <br />
          <strong>
            Login with your credentials <a href="/sign-in-citizen">here</a>
          </strong>
        </Panel>
      </div>
    </div>
  );
};

export default EmailConfirmed;

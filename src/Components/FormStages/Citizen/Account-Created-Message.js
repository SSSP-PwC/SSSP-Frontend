import React from "react";

import { Panel } from "govuk-react";

export const AccountCreatedMessage = ({}) => {
  return (
    <div style={{ display: "inline-block" }}>
      <div>
        <Panel
          title="Account has been created successfully"
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

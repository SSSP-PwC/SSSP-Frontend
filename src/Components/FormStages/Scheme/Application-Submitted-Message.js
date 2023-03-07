import React from "react";

import { Panel } from "govuk-react";

export const ApplicationSubmitted = ({  }) => {

  return (
    <div style={{ display: "inline-block" }}>
        <div>
          <Panel
            title="Application complete"
            style={{ backgroundColor: "#00823B" }}
          >
            Your reference number
            <br />
            <strong>HD1939380</strong>
          </Panel>
        </div>
    </div>
  );
};

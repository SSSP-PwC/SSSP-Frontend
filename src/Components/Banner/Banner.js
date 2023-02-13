import * as React from "react";

import FlexBanner from "flex-banner";

class Banner extends React.Component {
  render() {
    return (
      <FlexBanner
        title="Find out more about smart cities"
        ctaLink="www.google.com"
        ctaTitle="Learn More"
        isCenter={false}
        crossIconSize={24}
        animationTime={1.5}
        delayToShowBanner={2}
        daysToLive={500}
        wrapperStyle={{ backgroundColor: "lightblue" }}
        mainStyleTitle={{ color: "black" }}
        mainStyleLink={{ color: "red" }}
        crossStyle={{ color: "red" }}
      />
    );
  }
}
export default Banner;
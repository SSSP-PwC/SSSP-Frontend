import { Divider, ImageList, ImageListItem } from "@mui/material";
import { Caption, Heading, Label, SearchBox, Button } from "govuk-react";
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
export default function Services() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [userId, setUserId] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [isStarClicked, setIsStarClicked] = useState(false);
  const [imageSrc, setImageSrc] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/4/49/Star_empty.svg"
  );
  const handleStarClick = (id) => {
    const newData = data.map((service) => {
      if (service.id === id) {
        return { ...service, isStarClicked: !service.isStarClicked };
      }
      return service;
    });
    setData(newData);
  };

  const [response, setResponse] = useState(undefined);
  const [url, setUrl] = useState(undefined);
  const [options, setOptions] = useState([]);
  const loggedInUserId = sessionStorage.getItem("Citizen_ID");

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  function ServiceIcon({ service, option, isStarClicked }) {
    const handleClick = () => {
      handleStarClick(service.id);
    };
    return (
      <div
        style={{
          textAlign: "center",
          position: "relative",
          display: "inline-block",
          margin: "10px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: "120px",
            height: "120px",
            borderRadius: "10px",
            alignItems: "center",
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/img/city.png"}
            alt=""
            style={{ width: "80px", height: "80px", marginTop: "20px" }}
          />
          <div
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              width: "30px",
              height: "30px",
              background: "",
            }}
          >
            <img
              src={
                service.isStarClicked
                  ? "https://upload.wikimedia.org/wikipedia/commons/2/29/Gold_Star.svg"
                  : "https://upload.wikimedia.org/wikipedia/commons/4/49/Star_empty.svg"
              }
              alt=""
              style={{ width: "30px", height: "30px" }}
              onClick={handleClick}
            />
          </div>
        </div>
        <p
          style={{
            color: "black",
            marginTop: "10px",
            width: "120px",
            wordWrap: "break-word",
          }}
        >
          {service.name}
        </p>
      </div>
    );
  }
  async function handleButtonClick(id) {
    setSelectedOption(id);

    const userResponse = await fetch(
      `https://pg-uk-n-app-765081.nw.r.appspot.com/api/citizen/${loggedInUserId}`
    );
    const userData = await userResponse.json();
    const email = userData.email;

    const authUrl = `https://pg-uk-n-app-765081.nw.r.appspot.com/api/wallet/auth/${email}/${id}`;

    const authResponse = await fetch(authUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (authResponse.status === 404) {
      const checkUserResponse = await fetch(
        `https://pg-uk-n-app-765081.nw.r.appspot.com/api/wallet/user_exists/${email}`
      );
      const checkUserData = await checkUserResponse.json();

      if (!checkUserData.exists) {
        const createUrl =
          "https://pg-uk-n-app-765081.nw.r.appspot.com/api/wallet/create_user";
        const createOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify({
            email: email,
            applicationUserId: loggedInUserId,
          }),
        };
        const createResponse = await fetch(createUrl, createOptions);
        const createData = await createResponse.json();
        console.log(createData);
        setResponse(createData);
        setUrl(createData.data.authorisationUrl);
        setRedirect(true);
        return createData;
      } else {
        console.log("User already registered");
        // Handle the case where the user is already registered
        return null;
      }
    } else {
      const authData = await authResponse.json();
      console.log(authData);
      setUrl(authData.data.authorisationUrl);
      setResponse(authData);
      setRedirect(true);
      return authData;
    }
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/portals`)
      .then((response) => response.json())
      .then((data) => setData(data), setLoaded(true));
  }, []);

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/wallet/get_institutions`,
        {
          method: "GET",
        }
      );

      const response = await resp.json();
      console.log(response.data);

      setOptions(response.data);
    }
    fetchData();
  }, []);
  return (
    <div>
      <img
        src={process.env.PUBLIC_URL + "/img/TopBanner.png"}
        style={{ height: "100", width: "100%", alignSelf: "center", top: "0" }}
      />
      <div style={{ padding: "30px" }}>
        <br />

        <Heading>Digital Services</Heading>
        <Divider style={{ backgroundColor: "black" }} />
        <div>
          <br></br>
          {redirect === false ? (
            <div>
              <Caption>What service are you looking for?</Caption>
              <br></br>

              <SearchBox
                label="Search banks"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              >
                <SearchBox.Input placeholder="Enter keywords to search SSSP Digital Services" />
                <SearchBox.Button />
              </SearchBox>
              <a href="/register-service">
                <Button style={{ marginTop: "20px" }}>
                  Register New Service
                </Button>
              </a>
              <br></br>
              <Box
                sx={{
                  maxWidth: { xs: 320, sm: 480 },
                  bgcolor: "background",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                  textColor="black"
                >
                  <Tab label="For You" />
                  <Tab label="Subscribed Services" />
                  <Tab label="Available Services" />
                  <Tab label="See All" />
                </Tabs>
              </Box>
              <br></br>
              {value === 0 && (
                <div
                  style={{
                    backgroundColor: "#528AAE",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "black",
                      height: "50px",
                      width: "100%",
                      borderRadius: "10px",
                    }}
                  >
                    <h3
                      style={{
                        color: "white",
                        position: "relative",
                        top: "10px",
                        left: "10px",
                      }}
                    >
                      Favorites
                    </h3>
                  </div>
                  <div style={{ display: "inline-block", marginTop: "20px" }}>
                    {data.map(
                      (service) =>
                        service.isStarClicked && (
                          <ServiceIcon
                            key={service.id}
                            service={service}
                            iconUrl={process.env.PUBLIC_URL + "/img/city.png"}
                          />
                        )
                    )}
                    {options.map(
                      (option) =>
                        option.isStarClicked && (
                          <ServiceIcon
                            key={option.id}
                            service={option}
                            iconUrl={process.env.PUBLIC_URL + "/img/city.png"}
                          />
                        )
                    )}
                  </div>
                  <div
                    style={{
                      backgroundColor: "black",
                      height: "50px",
                      width: "100%",
                      borderRadius: "10px",
                    }}
                  >
                    <h3
                      style={{
                        color: "white",
                        position: "relative",
                        top: "10px",
                        left: "10px",
                      }}
                    >
                      Recently Visited
                    </h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      margin: "-10px",
                      marginTop: "20px",
                    }}
                  >
                    {data.slice(6, 14).map((service) => (
                      <ServiceIcon
                        key={service.id}
                        service={service}
                        iconUrl={process.env.PUBLIC_URL + "/img/city.png"}
                      />
                    ))}
                    {options.slice(3, 9).map((option) => (
                      <ServiceIcon
                        key={option.id}
                        service={option}
                        iconUrl={process.env.PUBLIC_URL + "/img/city.png"}
                      />
                    ))}
                  </div>
                </div>
              )}
              {value === 1 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gridGap: "16px",
                    gridAutoRows: "300px",
                  }}
                >
                  {options
                    .filter((option) =>
                      option.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    )
                    .map((option) => (
                      <Card key={option.id}>
                        <center>
                          <CardMedia
                            sx={{
                              height: 120,
                              width: 120,
                            }}
                            image={
                              option.media.find((m) => m.type === "icon")
                                ?.source || option.media[0].source
                            }
                            title={option.name}
                          />
                          <CardContent
                            sx={{ height: "200px", position: "relative" }}
                          >
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {option.name}
                            </Typography>
                            <Button
                              style={{
                                position: "absolute",
                                bottom: "16px",
                                left: "50%",
                                padding: "5px",
                                transform: "translateX(-50%)",
                              }}
                              onClick={() => handleButtonClick(option.id)}
                            >
                              Register
                            </Button>
                          </CardContent>
                        </center>
                      </Card>
                    ))}
                </div>
              )}
            </div>
          ) : (
            <div>{window.location.replace(url)}</div>
          )}
        </div>
        <br />
      </div>
    </div>
  );
}

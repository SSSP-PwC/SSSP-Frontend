import { Divider, ImageList, ImageListItem } from "@mui/material";
import { Caption, Heading, Label, SearchBox } from "govuk-react";
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
export default function Services() {
  const [selectedOption, setSelectedOption] = useState("");
  const [userId, setUserId] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [response, setResponse] = useState(undefined);
  const [url, setUrl] = useState(undefined);
  const [options, setOptions] = useState([]);
  const loggedInUserId = sessionStorage.getItem("Citizen_ID");

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  async function handleImageClick(id) {
    setSelectedOption(id);

    const userResponse = await fetch(
      `https://sssp-378808.nw.r.appspot.com/api/citizen/${loggedInUserId}`
    );
    const userData = await userResponse.json();
    const email = userData.email;

    const url = `https://sssp-378808.nw.r.appspot.com/api/wallet/auth/${email}/${id}`;
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    setUrl(data.data.authorisationUrl);
    setResponse(data);
    setRedirect(true);

    return data;
  }

  async function registerUser() {
    const url = `https://sssp-378808.nw.r.appspot.com/api/wallet/create_user/${userId}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ applicationUserId: userId }),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    setResponse(data);
    return data;
  }

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(
        `https://sssp-378808.nw.r.appspot.com/api/wallet/get_institutions`,
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
                  <Tab label="Subscribed Services" />
                  <Tab label="Available Services" />
                  <Tab label="See All" />
                </Tabs>
              </Box>
              <br></br>
              {value === 0 && (
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
                        <div onClick={() => handleImageClick(option.id)}>
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
                              style={{
                                cursor: "pointer",
                              }}
                              onMouseOver={(e) =>
                                (e.currentTarget.style.border =
                                  "2px solid blue")
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.border = "")
                              }
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {option.name}
                              </Typography>
                            </CardContent>
                          </center>
                        </div>
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

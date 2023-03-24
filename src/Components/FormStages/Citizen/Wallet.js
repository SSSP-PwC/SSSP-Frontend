import { Divider, ImageList, ImageListItem } from "@mui/material";
import { Caption, Heading, Label, SearchBox, Spinner } from "govuk-react";
import React, { useEffect, useState } from "react";

export default function Wallet() {
  const [selectedOption, setSelectedOption] = useState("");
  const [userId, setUserId] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [response, setResponse] = useState(undefined);
  const [url, setUrl] = useState(undefined);
  const [options, setOptions] = useState([]);
  const loggedInUserId = sessionStorage.getItem("Citizen_ID");
  console.log(selectedOption);
  

  async function handleImageClick(id) {
    setSelectedOption(id);
  
    const userResponse = await fetch(`https://sssp-378808.nw.r.appspot.com/api/citizen/${loggedInUserId}`);
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
    console.log(data)
    setUrl(data.data.authorisationUrl);
    setResponse(data);
    setRedirect(true)
  
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
    <div className="container">
      <br />
      <Heading>Wallet</Heading>
      <Divider style={{ backgroundColor: "black" }} />
      <div>
        <br></br>
        {redirect === false ? (
          <div>
            <Caption>Select your bank</Caption>
            <br></br>

            <SearchBox
              label="Search banks"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            >
              <SearchBox.Input placeholder="Search" />
              <SearchBox.Button />
            </SearchBox>
            <br></br>
            <center>
              <ImageList sx={{ maxWidth: "50%", maxHeight: "50%" }}>
                {options
                  .filter((option) =>
                    option.name.toLowerCase().includes(searchText.toLowerCase())
                  )
                  .map((option) => (
                    <ImageListItem
                      key={option.id}
                      onClick={() => handleImageClick(option.id)}
                      style={{
                        border: "2px solid black",
                        borderRadius: "4px",
                      }}
                    >
                      <img
                        src={option.media[0].source}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.border = "2px solid blue")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.border = "")
                        }
                      />
                    </ImageListItem>
                  ))}
              </ImageList>
            </center>
          </div>
        ) : (
          <div>

            {window.location.replace(url)}
          </div>
        )}
      </div>
      <br />
    </div>
  );
}

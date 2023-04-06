import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "./theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useMediaQuery } from "@mui/material";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { DetailsOutlined } from "@mui/icons-material";
import "react-pro-sidebar/dist/css/styles.css";
import { Heading } from "govuk-react";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.primary[900],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState();
  const citizen_id = sessionStorage.getItem("Citizen_ID");

  const [citizen, setCitizen] = useState();

  useEffect(() => {
    setIsCollapsed(isSmallScreen);
    async function fetchCitizen() {
      const response = await fetch(
        `https://sssp-378808.nw.r.appspot.com/api/${citizen_id}`
      );
      const data = await response.json();
      setCitizen(data);
    }
    fetchCitizen();
  }, [isSmallScreen]);

  return (
    <div>
      {isSmallScreen === true ? (
        <div></div>
      ) : (
        <Box
          style={{ height: "100%" }}
          sx={{
            "& .pro-sidebar-inner": {
              bgcolor: "#212529",
            },
            "& .pro-icon-wrapper": {
              backgroundColor: "transparent !important",
            },
            "& .pro-inner-item": {
              padding: "5px 35px 5px 20px !important",
            },
            "& .pro-inner-item:hover": {
              color: "#868dfb !important",
            },
            "& .pro-menu-item.active": {
              color: "#6870fa !important",
            },
          }}
        >
          <ProSidebar collapsed={isCollapsed}>
            <Menu iconShape="square">
              <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{
                  margin: "10px 0 20px 0",
                }}
              >
                {!isCollapsed && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px"
                  >
                    <Typography variant="h3" color={colors.primary[900]}>
                      Site Builder
                    </Typography>
                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon
                        style={{ color: colors.primary[900] }}
                      />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>

              {!isCollapsed && (
                <Box mb="25px">
                  <Box textAlign="center">
                    <Typography variant="h2" sx={{ m: "10px 0 0 0" }}>
                      <Heading
                        style={{
                          fontSize: "20px",
                          fontWeight: "normal",
                          color: colors.primary[900],
                        }}
                      >
                        {citizen?.first_name} {citizen?.last_name}
                      </Heading>
                    </Typography>
                  </Box>
                </Box>
              )}

              <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                <Item
                  title="My Home"
                  to="/site-home"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
                  Details
                </Typography>
                <Item
                  title="Site Details"
                  to="/team"
                  icon={<DetailsOutlined />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
                  Pages
                </Typography>
                <Item
                  title="See Pages"
                  to="/form"
                  icon={<AutoStoriesIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </Box>
            </Menu>
          </ProSidebar>
        </Box>
      )}
    </div>
  );
};

export default Sidebar;

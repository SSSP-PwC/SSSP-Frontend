import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "./theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useMediaQuery } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider } from "@mui/material";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { DetailsOutlined } from "@mui/icons-material";
import "react-pro-sidebar/dist/css/styles.css";
import { Heading, SearchBox } from "govuk-react";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
const SubMenu = ({ title, subMenuItems }) => (
  <Menu iconShape="square" subMenu>
    {subMenuItems.map((item, index) => (
      <MenuItem key={index} style={{ paddingLeft: "1rem" }}>
        <Link to={item.to}>
          <Typography>{item.name}</Typography>
        </Link>
      </MenuItem>
    ))}
  </Menu>
);




const componentList = [
  {
    name: "Header",
    icon: <AddCircleOutlineOutlined />,
    subMenuItems: [
      { name: "Logo", to: "/logo" },
      { name: "Navigation", to: "/navigation" },
      { name: "Banner", to: "/banner" },
    ],
  },
  { name: "Image", icon: <AddCircleOutlineOutlined /> },
  { name: "Text", icon: <AddCircleOutlineOutlined /> },
  { name: "Button", icon: <AddCircleOutlineOutlined /> },
  { name: "Input", icon: <AddCircleOutlineOutlined /> },
  { name: "Image", icon: <AddCircleOutlineOutlined /> },
  { name: "Navbar", icon: <AddCircleOutlineOutlined /> },
  { name: "Footer", icon: <AddCircleOutlineOutlined /> },
  { name: "File Upload", icon: <AddCircleOutlineOutlined /> },
  { name: "Checkbox", icon: <AddCircleOutlineOutlined /> },
  { name: "Captcha", icon: <AddCircleOutlineOutlined /> },
  { name: "Text area", icon: <AddCircleOutlineOutlined /> },
  { name: "Label", icon: <AddCircleOutlineOutlined /> },
  { name: "Multi choice", icon: <AddCircleOutlineOutlined /> },
  { name: "Phone number", icon: <AddCircleOutlineOutlined /> },
];

const Sidebar = ({ link, mode }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [selected, setSelected] = useState({});
  const [data, setData] = useState(selected)

  const citizen_id = sessionStorage.getItem("Citizen_ID");
  console.log(selected);
  sessionStorage.setItem("Item", selected);

  const [citizen, setCitizen] = useState();

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredComponents = componentList.filter((component) =>
    component.name.toLowerCase().includes(searchText.toLowerCase())
  );
const Item = ({ title, to, icon, subMenuItems }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleItemClick = () => {
    setIsSubMenuOpen((prevIsSubMenuOpen) => !prevIsSubMenuOpen);
  };

  return (
    <>
      <MenuItem onClick={handleItemClick} icon={icon}>
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
      {subMenuItems && to && isSubMenuOpen && (
        <Menu iconShape="square" subMenu>
          {subMenuItems.map((item, index) => (
            <MenuItem key={index} style={{ paddingLeft: "1rem" }}>
              <Link to={item.to}>
                <Typography>{item.name}</Typography>
              </Link>
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};

  

  useEffect(() => {
    setIsCollapsed(isSmallScreen);
    async function fetchCitizen() {
      const response = await fetch(
        `https://sssp-378808.nw.r.appspot.com/api/${citizen_id}`
      );
      const data = await response.json();
      setCitizen(data);
      console.log(selected);
    }
    fetchCitizen();
  }, [isSmallScreen]);
  return (
    <div>

      <ThemeProvider theme={theme}>
        <ColorModeContext.Provider value={colorMode}>
          {isSmallScreen === true ? (
            <div></div>
          ) : (
            <div>
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
                <ProSidebar
                  collapsed={isCollapsed}
                  style={{
                    backgroundColor: "#212529",
                    border: "none",
                    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    margin: "3px",
                    marginTop: "0px",
                  }}
                >
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
                          <IconButton
                            onClick={() => setIsCollapsed(!isCollapsed)}
                          >
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
                          <Typography
                            variant="h2"
                            sx={{ m: "10px 0 0 0" }}
                          ></Typography>
                        </Box>
                      </Box>
                    )}
                    {mode === "Site Home" && (
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
                          title="Create Pages"
                          to={`/page-builder-interface/?domain=${link}`}
                          icon={<AutoStoriesIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                      </Box>
                    )}
                    {!isCollapsed && mode !== "Site Home" && (
                      <Box>
                        <div style={{ margin: "20px" }}>
                          <SearchBox
                            value={searchText}
                            onChange={(event) =>
                              setSearchText(event.target.value)
                            }
                            fullWidth
                            sx={{ mb: 2 }}
                          >
                            <SearchBox.Input placeholder="Search element" />
                            <SearchBox.Button />
                          </SearchBox>

                          <List style={{ color: "white" }}>
                            {filteredComponents.map((component) => (
                              <ListItem
                                button
                                key={component.name}
                                selected={selected === component.name}
                                onClick={() => setSelected(component.name)}
                              >
                                <ListItemIcon style={{ color: "white" }}>
                                  {component.icon}
                                </ListItemIcon>
                                <ListItemText primary={component.name} />
                              </ListItem>
                            ))}
                          </List>
                        </div>
                      </Box>
                    )}

                    {isCollapsed && mode !== "Site Home" && (
                      <Box>
                        <div style={{ margin: "20px" }}>
                          <List style={{ color: "white" }}>
                            {filteredComponents.map((component) => (
                              <ListItem
                                button
                                key={component.name}
                                selected={selected === component.name}
                                onClick={() => setSelected(component.name)}
                              >
                                <ListItemIcon style={{ color: "white" }}>
                                  {component.icon}
                                </ListItemIcon>
                                <ListItemText primary={component.name} />
                              </ListItem>
                            ))}
                          </List>
                        </div>
                      </Box>
                    )}
                  </Menu>
                </ProSidebar>
              </Box>
            </div>
          )}
        </ColorModeContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export default Sidebar;

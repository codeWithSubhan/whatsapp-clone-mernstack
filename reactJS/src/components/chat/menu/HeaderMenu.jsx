import { useState, useContext } from "react";

import { MoreVert } from "@mui/icons-material";
import { Menu, MenuItem, styled } from "@mui/material";

import { googleLogout } from "@react-oauth/google";
//components
import InfoDrawer from "../../drawer/Drawer";

const MenuOption = styled(MenuItem)`
  font-size: 14px;
  padding: 15px 60px 5px 24px;
  color: #4a4a4a;
`;

const Logout = styled(googleLogout)`
  border: none;
  box-shadow: none;
`;

const HeaderMenu = () => {
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const toggleDrawer = () => {
    setOpenDrawer(true);
  };

  return (
    <>
      <MoreVert onClick={handleClick} />
      <Menu
        anchorEl={open}
        keepMounted
        open={open}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuOption
          onClick={() => {
            handleClose();
            toggleDrawer();
          }}
        >
          Profile
        </MenuOption>
        <MenuOption
          onClick={() => {
            handleClose();
            toggleDrawer();
          }}
        >
          Profile
        </MenuOption>
      </Menu>
      <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} profile={true} />
    </>
  );
};

export default HeaderMenu;

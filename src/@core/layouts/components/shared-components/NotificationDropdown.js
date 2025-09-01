// ** React Imports
import { useState, Fragment } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiMenu from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

// ** Icon Imports
import Icon from "@/@core/components/icon";

// ** Third Party Components
import PerfectScrollbarComponent from "react-perfect-scrollbar";

// ** Custom Components Imports
import CustomChip from "@/@core/components/mui/chip";
import CustomAvatar from "@/@core/components/mui/avatar";

import { useGetNotificaciones } from "@/hooks/useGetNotificaciones";

// ** Styled Menu component
const Menu = styled(MuiMenu)(({ theme }) => ({
  "& .MuiMenu-paper": {
    width: 380,
    overflow: "hidden",
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  "& .MuiMenu-list": {
    padding: 0,
  },
}));

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  "&:not(:last-of-type)": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: 349,
});

// ** Styled Avatar component
const Avatar = styled(CustomAvatar)({
  width: 38,
  height: 38,
  fontSize: "1.125rem",
});

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  flex: "1 1 100%",
  overflow: "hidden",
  fontSize: "0.875rem",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  marginBottom: theme.spacing(0.75),
}));

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)({
  flex: "1 1 100%",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const ScrollWrapper = ({ children, hidden }) => {
  if (hidden) {
    return <Box sx={{ maxHeight: 349, overflowY: "auto", overflowX: "hidden" }}>{children}</Box>;
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>;
  }
};

const NotificationDropdown = () => {
  const { notificaciones, loadingNotificaciones } = useGetNotificaciones();

  // ** States
  const [anchorEl, setAnchorEl] = useState(null);

  // ** Hook
  const hidden = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  // ** Vars

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="inherit" aria-haspopup="true" onClick={handleDropdownOpen} aria-controls="customized-menu">
        <Badge
          color="error"
          badgeContent={notificaciones?.length}
          showZero
        >
          <Icon icon="mdi:bell-outline" />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{ cursor: "default", userSelect: "auto", backgroundColor: "transparent !important" }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <Typography sx={{ cursor: "text", fontWeight: 600 }}>Notificaciones</Typography>
            <CustomChip
              skin="light"
              size="small"
              color="primary"
              label={`${notificaciones?.length} Notificaciones`}
              sx={{ height: 20, fontSize: "0.75rem", fontWeight: 500, borderRadius: "10px" }}
            />
          </Box>
        </MenuItem>
        <ScrollWrapper>
          { notificaciones?.map.length > 0 ? notificaciones?.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={handleDropdownClose}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
            >
              <MenuItemTitle>
                <Typography variant="subtitle2" sx={{ wordBreak: "break-word", width: "100%", whiteSpace: "normal", fontWeight:900 }}>
                  {notification.title}
                </Typography>
              </MenuItemTitle>
              <MenuItemSubtitle variant="subtitle2">{notification.statuscode}</MenuItemSubtitle>
              <Typography
                variant="caption"
                sx={{ color: "text.disabled", wordBreak: "break-word", width: "100%", whiteSpace: "normal" }}
              >
                {notification.description}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "text.disabled", wordBreak: "break-word", width: "100%", whiteSpace: "normal" }}
              >
                {notification.createdAt}
              </Typography>
            </MenuItem>
          )) :
          <MenuItem
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <MenuItemTitle>
            <Typography variant="subtitle2" sx={{ wordBreak: "break-word", width: "100%", whiteSpace: "normal", fontWeight:900 }}>
              Sin notificaciones
            </Typography>
          </MenuItemTitle>
        </MenuItem>
        }
        </ScrollWrapper>
      </Menu>
    </>
  );
};

export default NotificationDropdown;

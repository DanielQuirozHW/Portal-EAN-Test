// ** Next Import
import Link from "next/link";

// ** MUI Imports
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";

// ** Custom Icon Import
import Icon from "../../../../../@core/components/icon";

// ** Configs
import Image from "next/image";
import logo from "../../../../../../public/images/favicon.ico";
import hero from "../../../../../../public/images/logo_blanco.webp";
import heroNegro from "../../../../../../public/images/logo_color.webp";

// ** Styled Components
const MenuHeaderWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingRight: theme.spacing(4.5),
  transition: "padding .25s ease-in-out",
  minHeight: theme.mixins.toolbar.minHeight,
}));

const LinkStyled = styled(Link)({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
});

const VerticalNavHeader = (props) => {
  // ** Props
  const {
    hidden,
    navHover,
    settings,
    saveSettings,
    collapsedNavWidth,
    toggleNavVisibility,
    navigationBorderWidth,
    menuLockedIcon: userMenuLockedIcon,
    navMenuBranding: userNavMenuBranding,
    menuUnlockedIcon: userMenuUnlockedIcon,
  } = props;

  const { navCollapsed } = settings;
  const menuCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 };

  const menuHeaderPaddingLeft = () => {
    if (navCollapsed && !navHover) {
      if (userNavMenuBranding) {
        return 0;
      } else {
        return (collapsedNavWidth - navigationBorderWidth - 30) / 8;
      }
    } else {
      return 6;
    }
  };
  const MenuLockedIcon = () => userMenuLockedIcon || <Icon icon="mdi:radiobox-marked" />;
  const MenuUnlockedIcon = () => userMenuUnlockedIcon || <Icon icon="mdi:radiobox-blank" />;

  return (
    <MenuHeaderWrapper className="nav-header" sx={{ pl: menuHeaderPaddingLeft() }}>
      {userNavMenuBranding ? (
        userNavMenuBranding(props)
      ) : (
        <LinkStyled href="/">
          {navCollapsed && !navHover ? (
            <Image src={logo} alt="Logo" width={30} height={30} />
          ) : settings.mode === "dark" ? (
            <Image src={hero} width={175} alt="Logo" />
          ) : (
            <Image src={heroNegro} width={175} alt="Logo" />
          )}
        </LinkStyled>
      )}

      {hidden ? (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={toggleNavVisibility}
          sx={{ p: 0, backgroundColor: "transparent !important" }}
        >
          <Icon icon="mdi:close" fontSize={20} />
        </IconButton>
      ) : userMenuLockedIcon === null && userMenuUnlockedIcon === null ? null : (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={() => saveSettings({ ...settings, navCollapsed: !navCollapsed })}
          sx={{
            p: 0,
            color: "text.primary",
            backgroundColor: "transparent !important",
            "& svg": {
              fontSize: "1.25rem",
              ...menuCollapsedStyles,
              transition: "opacity .25s ease-in-out",
            },
          }}
        >
          {navCollapsed ? MenuUnlockedIcon() : MenuLockedIcon()}
        </IconButton>
      )}
    </MenuHeaderWrapper>
  );
};

export default VerticalNavHeader;

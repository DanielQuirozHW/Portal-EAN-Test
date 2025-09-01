// ** React Import
import { useRef, useState } from "react";

// ** MUI Imports
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import {
  createTheme,
  responsiveFontSizes,
  styled,
  ThemeProvider,
} from "@mui/material/styles";

// ** Third Party Components
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Theme Config
import themeConfig from "../../../../../configs/themeConfig";

// ** Component Imports
import Drawer from "./Drawer";
import VerticalNavItems from "./VerticalNavItems";
import VerticalNavHeader from "./VerticalNavHeader";

// ** Theme Options
import themeOptions from "../../../../theme/ThemeOptions";

// ** Util Import
import Image from "next/image";
import { hexToRGBA } from "../../../../utils/hex-to-rgba";
import logoBlanco from "../../../../../../public/images/Web_Portal_blanco.svg";
import logoNegro from "../../../../../../public/images/Web Portal Black.svg";

const StyledBoxForShadow = styled(Box)(({ theme }) => ({
  top: 60,
  left: -8,
  zIndex: 2,
  opacity: 0,
  position: "absolute",
  pointerEvents: "none",
  width: "calc(100% + 15px)",
  height: theme.mixins.toolbar.minHeight,
  transition: "opacity .15s ease-in-out",
  background: `linear-gradient(${theme.palette.background.default} ${
    theme.direction === "rtl" ? "95%" : "5%"
  },${hexToRGBA(theme.palette.background.default, 0.85)} 30%,${hexToRGBA(
    theme.palette.background.default,
    0.5
  )} 65%,${hexToRGBA(theme.palette.background.default, 0.3)} 75%,transparent)`,
  "&.scrolled": {
    opacity: 1,
  },
}));

const Navigation = (props) => {
  // ** Props
  const {
    hidden,
    settings,
    afterNavMenuContent,
    beforeNavMenuContent,
    navMenuContent: userNavMenuContent,
  } = props;

  // ** States
  const [navHover, setNavHover] = useState(false);
  const [groupActive, setGroupActive] = useState([]);
  const [currentActiveGroup, setCurrentActiveGroup] = useState([]);

  // ** Ref
  const shadowRef = useRef(null);

  // ** Var
  const { navCollapsed } = settings;
  const {
    afterVerticalNavMenuContentPosition,
    beforeVerticalNavMenuContentPosition,
  } = themeConfig;

  const navMenuContentProps = {
    ...props,
    navHover,
    groupActive,
    setGroupActive,
    currentActiveGroup,
    setCurrentActiveGroup,
  };

  // ** Create new theme for the navigation menu when mode is `semi-dark`
  let darkTheme = createTheme(themeOptions(settings, "dark"));

  // ** Set responsive font sizes to true
  if (themeConfig.responsiveFontSizes) {
    darkTheme = responsiveFontSizes(darkTheme);
  }

  // ** Fixes Navigation InfiniteScroll
  const handleInfiniteScroll = (ref) => {
    if (ref) {
      // @ts-ignore
      ref._getBoundingClientRect = ref.getBoundingClientRect;
      ref.getBoundingClientRect = () => {
        // @ts-ignore
        const original = ref._getBoundingClientRect();

        return { ...original, height: Math.floor(original.height) };
      };
    }
  };

  // ** Scroll Menu
  const scrollMenu = (container) => {
    if (
      beforeVerticalNavMenuContentPosition === "static" ||
      !beforeNavMenuContent
    ) {
      container = hidden ? container.target : container;
      if (shadowRef && container.scrollTop > 0) {
        // @ts-ignore
        if (!shadowRef.current.classList.contains("scrolled")) {
          // @ts-ignore
          shadowRef.current.classList.add("scrolled");
        }
      } else {
        // @ts-ignore
        shadowRef.current.classList.remove("scrolled");
      }
    }
  };
  const ScrollWrapper = hidden ? Box : PerfectScrollbar;

  return (
    <ThemeProvider theme={darkTheme}>
      <Drawer {...props} navHover={navHover} setNavHover={setNavHover}>
        <VerticalNavHeader {...props} navHover={navHover} />
        {beforeNavMenuContent &&
        beforeVerticalNavMenuContentPosition === "fixed"
          ? beforeNavMenuContent(navMenuContentProps)
          : null}
        {(beforeVerticalNavMenuContentPosition === "static" ||
          !beforeNavMenuContent) && <StyledBoxForShadow ref={shadowRef} />}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontSize:".5rem",
          }}
        >
          <Box sx={{ position: "relative", overflow: "hidden" }}>
            {/* @ts-ignore */}
            <ScrollWrapper
              {...(hidden
                ? {
                    onScroll: (container) => scrollMenu(container),
                    sx: {
                      height: "100%",
                      overflowY: "auto",
                      overflowX: "hidden",
                    },
                  }
                : {
                    options: { wheelPropagation: false },
                    onScrollY: (container) => scrollMenu(container),
                    containerRef: (ref) => handleInfiniteScroll(ref),
                  })}
            >
              {beforeNavMenuContent &&
              beforeVerticalNavMenuContentPosition === "static"
                ? beforeNavMenuContent(navMenuContentProps)
                : null}
              {userNavMenuContent ? (
                userNavMenuContent(navMenuContentProps)
              ) : (
                <List
                  className="nav-items"
                  sx={{
                    pt: 0,
                    transition: "padding .25s ease",
                    "& > :first-child": { mt: "0" },
                    pr:
                      !navCollapsed || (navCollapsed && navHover) ? 4.5 : 1.25,
                  }}
                >
                  <VerticalNavItems
                    navHover={navHover}
                    groupActive={groupActive}
                    setGroupActive={setGroupActive}
                    currentActiveGroup={currentActiveGroup}
                    setCurrentActiveGroup={setCurrentActiveGroup}
                    {...props}
                  />
                </List>
              )}
              {afterNavMenuContent &&
              afterVerticalNavMenuContentPosition === "static"
                ? afterNavMenuContent(navMenuContentProps)
                : null}
            </ScrollWrapper>
          </Box>
          <Box
            sx={{
              // si el nav está colapsado, que sea chiquita siempre
              width: navCollapsed ? 44 : { xs: 72, sm: 88, md: 120, lg: 150, xl: 180 },
              display: { xs: 'none', sm: 'block' }, // opcional: ocultar en xs
              textAlign: 'center',
              mt: { xs: 2, md: 6, lg: 10 },
              mb: { xs: 2, md: 3 },
              mx: 'auto',
              transition: 'width .3s ease-in-out',
            }}
          >
            <Image
              src="/images/Meli.png"
              alt="Abeja"
              width={200}
              height={200}
              sizes="(max-width:600px) 72px, (max-width:900px) 88px, (max-width:1200px) 120px, 150px"
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              priority
            />
          </Box>
          {afterNavMenuContent &&
          afterVerticalNavMenuContentPosition === "fixed"
            ? afterNavMenuContent(navMenuContentProps)
            : null}
          {(!navCollapsed || navHover) && (
            <Box
               sx={{
                position: "sticky",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                textAlign: "center",
                mb: 5,
                ml: 30,
                width: "100%", // Asegura que el ancho sea el 100% del Drawer
              }}
            >
              {settings.mode === "dark" ? (
                <Image src={logoBlanco} width={150} alt="logo" />
              ) : (
                <Image src={logoNegro} width={150} alt="logo" />
              )}
            </Box>
          )}
        </Box>
      </Drawer>
    </ThemeProvider>
  );
};

export default Navigation;

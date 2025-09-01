import useMediaQuery from "@mui/material/useMediaQuery";

// ** Layout Imports
// !Do not remove this Layout import
import Layout from "../@core/layouts/Layout";

// ** Navigation Imports
import VerticalNavItems from "../navigation/vertical";

import VerticalAppBarContent from "./components/vertical/AppBarContent";

// ** Hook Import
import { useSettings } from "../@core/hooks/useSettings";

const UserLayout = ({ children, contentHeightFixed }) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings();

  const hidden = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  if (hidden && settings.layout === "horizontal") {
    settings.layout = "vertical";
  }

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      verticalLayoutProps={{
        navMenu: {
          navItems: VerticalNavItems(),

          // Uncomment the below line when using server-side menu in vertical layout and comment the above line
          // navItems: verticalMenuItems
        },
        appBar: {
          content: (props) => (
            <VerticalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          ),
        },
      }}
    >
      {children}
    </Layout>
  );
};

export default UserLayout;

// ** React Imports
import { useContext, useEffect, useState } from "react";
// ** MUI Components
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiTabList from "@mui/lab/TabList";

import Icon from "@/@core/components/icon";
import PageHeader from "@/@core/components/page-header";
import { LinearProgress } from "@mui/material";
import LegajoInfo from "./component/LegajoInfo";
import useMiLegajo from "@/hooks/useMiLegajo";
import useGetPaises from "@/hooks/useGetPaises";
import useGetProvincias from "@/hooks/useGetProvincias";
import PerfilHeader from "./component/PerfilHeader";
import useGetLocalidades from "@/hooks/useGetLocalidades";
import { analytics } from "@/configs/firebaseConfig";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { logEvent } from "firebase/analytics";

const TabList = styled(MuiTabList)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`,
  },
  "& .MuiTab-root": {
    minWidth: 65,
    minHeight: 38,
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up("sm")]: {
      minWidth: 130,
    },
  },
}));

const Legajo = () => {
  // ** State
  const [activeTab, setActiveTab] = useState("informacion");

  // ** Hooks
  const hideText = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { legajo, loadingLegajo } = useMiLegajo();
  const { paises } = useGetPaises();
  const { provincias } = useGetProvincias();
  const { localidades } = useGetLocalidades();

  const tabContentList = {
    informacion: <LegajoInfo empleado={legajo} paises={paises} provincias={provincias} localidades={localidades} />,
  };

  const handleChange = (event, value) => {
    setActiveTab(value);
  };

  const { user } = useContext(AuthContext)
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && user?.email && analytics) {
      const userName = user.email.split('@')[0];
      logEvent(analytics, 'screen_view', {
        screen_name: router.pathname,
        user_email: userName,
      });
    }
  }, [user, router.pathname, analytics]);
    
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PerfilHeader empleado={legajo} />
      </Grid>
      <Grid item xs={12} display="flex" alignItems="center" sx={{ mt: 2 }} >
        <PageHeader title={"Información"} subtitle="Visualiza tus datos personales cargados en la Universidad." />
      </Grid>
      <Grid item xs={12}>

      {tabContentList[activeTab]}
      </Grid>
    </Grid>
  );
};
export default Legajo;

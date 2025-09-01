import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

const NavigationIndex = () => {
  const { user } = useContext(AuthContext);

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const additionalMenuItems = [];

    additionalMenuItems.push(
        {
          title: (
            <Typography sx={{ fontSize: ".85rem", fontWeight: "400" }}>
              Inicio
            </Typography>
          ),
          icon: "ic:outline-home",
          path: "/",
        },
        {
          title: (
            <Typography sx={{ fontSize: ".85rem", fontWeight: "400" }}>
              Perfil
            </Typography>
          ),
          icon: "mdi:account-eye-outline",
          path: "/perfil",
        },
        {
          title: (
            <Typography sx={{ fontSize: ".85rem", fontWeight: "400" }}>
              Evaluación Profesoral
            </Typography>
          ),
          icon: "mdi:clipboard-check",
          path: "/evaluacion-profesoral",
        },

      );

    setMenu([...additionalMenuItems]);

  }, [user]);

  return menu;
};

export default NavigationIndex;
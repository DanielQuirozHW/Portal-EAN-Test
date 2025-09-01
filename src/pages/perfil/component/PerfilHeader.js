// ** React Imports
import { useState, useEffect, useContext } from "react";

// ** MUI Components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// ** Icon Imports
import Icon from "@/@core/components/icon";

import toast from "react-hot-toast";
import { Badge, IconButton } from "@mui/material";
import { AuthContext } from "@/context/AuthContext";

const PerfilHeader = ({empleado}) => {
  const [data, setData] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const { actualizarFotoPerfil, actualizarFotoPortada, user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.photoURL) {
      setProfilePicture(user.photoURL);
    }
    if (user?.photoPORTADA) {
      setCoverPicture(user.photoPORTADA);
    }
  }, [user]);

  const designationIcon = data?.designationIcon || "mdi:briefcase-outline";

  const ProfilePicture = styled("img")(({ theme }) => ({
    width: 160,
    height: 160,
    borderRadius: theme.shape.borderRadius, // Para hacer un círculo con la imagen de perfil
    border: `5px solid ${theme.palette.common.white}`,
    objectFit: "cover", // Ajustar la imagen para cubrir completamente el contenedor
    objectPosition: "center", // Centrar la imagen dentro del contenedor
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(4),
    },
  }));

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];

    if (file === undefined) {
      console.log("no se selecciono ninguna imagen");
      return;
    }

    if (file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg") {
      toast.error("El formato de la foto debe ser png/jpg/jpeg");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageDataUrl = reader.result;
      const imgBlob = dataURLToBlob(imageDataUrl); // Convertir el data URL a un blob
      actualizarFotoPerfil(imgBlob).then(() => {
        setProfilePicture(imageDataUrl);
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCoverPictureChange = (event) => {
    const file = event.target.files[0];

    if (file === undefined) {
      console.log("no se selecciono ninguna imagen");
      return;
    }

    if (file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg") {
      toast.error("El formato de la foto debe ser png/jpg/jpeg");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageDataUrl = reader.result;
      const imgBlob = dataURLToBlob(imageDataUrl); // Convertir el data URL a un blob
      actualizarFotoPortada(imgBlob).then(() => {
        setCoverPicture(imageDataUrl);
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Función auxiliar para convertir un data URL a un blob
  const dataURLToBlob = (dataURL) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  return (
    <Card>
      <div>
        <input
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          style={{ display: "none" }}
          onChange={handleCoverPictureChange}
          id="cover-picture-input"
        />
        {/* Mostrar la foto de portada actual o una imagen por defecto */}
        {/* <label htmlFor="cover-picture-input"> */}
          <CardMedia
            component="img"
            alt="profile-header"
            image={ /*coverPicture ||*/ "/images/campus.webp"} // Descomentar si se requiere una foto de portada.
            sx={{
              height: { xs: 150, md: 250 },
              objectFit: "cover", // Ajusta y recorta la imagen para llenar el contenedor
            }}
          />
          {/* <div style={{ position: "relative" }}>
            <IconButton
              color="primary"
              component="label"
              htmlFor="cover-picture-input"
              sx={{
                position: "absolute",
                top: "-50px",
                right: "8px",
                color: "rgba(231, 227, 252, 0.54)",
                backgroundColor: "rgba(9, 8, 8, 0.7)",
                borderRadius: "50%",
                "&:hover": {
                  backgroundColor: "rgba(102, 95, 95, 0.9)",
                },
              }}
            >
              <Icon icon="mdi:camera-plus" />
            </IconButton>
          </div> */}
        {/* </label> */}
      </div>
      <CardContent
        sx={{
          pt: 0,
          mt: -8,
          display: "flex",
          alignItems: "flex-end",
          flexWrap: { xs: "wrap", md: "nowrap" },
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        <div>
          {/* Input de tipo file oculto para seleccionar una nueva foto de perfil */}
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            style={{ display: "none" }}
            onChange={handleProfilePictureChange}
            id="profile-picture-input"
          />
          {/* Botón o enlace para abrir el input de tipo file */}
          <label htmlFor="profile-picture-input">
            <ProfilePicture
              src={profilePicture || "/images/profileNull.webp"} // Mostrar la imagen de perfil actual
              alt="profile-picture"
            />
            <Badge
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <IconButton
                  component="span"
                  sx={{
                    color: "rgba(231, 227, 252, 0.54)",
                    backgroundColor: "rgba(9, 8, 8, 0.7)",
                    borderRadius: "50%",
                    "&:hover": {
                      backgroundColor: "rgba(102, 95, 95, 0.9)",
                    },
                  }}
                >
                  <Icon icon="mdi:camera-plus" sx={{ color: "#1c1e21" }} />
                </IconButton>
              }
            ></Badge>
          </label>
        </div>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            ml: { xs: 0, md: 6 },
            alignItems: "flex-end",
            flexWrap: ["wrap", "nowrap"],
            justifyContent: ["center", "space-between"],
          }}
        >
          <Box sx={{ mb: [6, 0], display: "flex", flexDirection: "column", alignItems: ["center", "flex-start"] }}>
            <Typography variant="h5" sx={{ mb: 4 }}>
              {user?.nombre}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: ["center", "flex-start"],
              }}
            >
              {/* <Box sx={{ mr: 5, display: "flex", alignItems: "center", "& svg": { mr: 1, color: "text.secondary" } }}>
                <Icon icon={designationIcon} />
                <Typography sx={{ ml: 1, color: "text.secondary", fontWeight: 600 }}>{empleado?.posicion}</Typography>
              </Box>
              <Box sx={{ mr: 5, display: "flex", alignItems: "center", "& svg": { mr: 1, color: "text.secondary" } }}>
                <Icon icon="mdi:map-marker-outline" />
                <Typography sx={{ ml: 1, color: "text.secondary", fontWeight: 600 }}>{empleado?.localidad?.label}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", "& svg": { mr: 1, color: "text.secondary" } }}>
                <Icon icon="mdi:calendar-blank" />
                <Typography sx={{ ml: 1, color: "text.secondary", fontWeight: 600 }}>
                  {empleado?.fechaIngreso}
                </Typography>
              </Box> */}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PerfilHeader;

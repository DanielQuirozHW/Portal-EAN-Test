// ** React Imports
import { Fragment, useContext, useEffect, useState } from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Imports
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Third Party Imports
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { cargarArchivos, getAdjuntosAsignaciones, getAsignaciones } from "@/redux/asignacion";
import DropzoneWrapper from "@/styles/react-dropzone";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";

// Styled component for the upload image inside the dropzone area
const Img = styled("img")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    // marginRight: theme.spacing(15.75),
  },
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(4),
  },
  [theme.breakpoints.down("sm")]: {
    width: 160,
  },
}));

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(4),
  },
}));

const FileUploaderMultiple = ({ id }) => {
  const { token } = useContext(AuthContext);
  const dispatch = useDispatch();

  // ** State
  const [files, setFiles] = useState([]);

  const enviarArchivos = () => {
    if (id?.length > 0) {
      if (files?.length > 0) {
        let file = new FormData();
        for (let index = 0; index < files?.length; index++) {
          let element = files[index];
          file.append(`body${index}`, element);
        }
        dispatch(cargarArchivos(token, id, file))
        .then((data) => {
          console.log("Promesa resuelta con éxito. Datos:", data);
          dispatch(getAsignaciones(token));
          dispatch(getAdjuntosAsignaciones(token))
        })
        .catch((error) => {
          console.error("Error al resolver la promesa:", error);
        })
        .finally(() => {
          setFiles([]); 
        });
      }
    }
  };

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file)));
    },
  });

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image")) {
      return <Image width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />;
    } else {
      return <Icon icon="mdi:file-document-outline" />;
    }
  };

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
  };

  const fileList = files.map((file) => (
    <ListItem key={file.name}>
      <div className="file-details">
        <div className="file-preview">{renderFilePreview(file)}</div>
        <div>
          <Typography className="file-name">{file.name}</Typography>
          <Typography className="file-size" variant="body2">
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Icon icon="mdi:close" fontSize={20} />
      </IconButton>
    </ListItem>
  ));

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  return (
    <DropzoneWrapper>
      <Box component="div" {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Img alt="Upload img" src="/images/misc/upload.png" />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            {/* <HeadingTypography variant="h5">Adjuntar Archivo.</HeadingTypography> */}
            <Typography color="textSecondary" sx={{ "& a": { color: "primary.main", textDecoration: "none" }, textAlign:"center" }}>
              Suelte los archivos aquí &nbsp;
              <Link href="/" onClick={(e) => e.preventDefault()}>
                o haga clic para seleccionar archivos
              </Link>{" "}
            </Typography>
          </Box>
        </Box>
      </Box>
      {files.length ? (
        <Fragment>
          <List>{fileList}</List>
          <Box component="div" className="buttons">
            <Button size="small" color="error" variant="outlined" onClick={handleRemoveAllFiles}>
              Quitar todo
            </Button>
            <Button size="small" variant="contained" onClick={enviarArchivos}>
              Cargar archivos
            </Button>
          </Box>
        </Fragment>
      ) : null}
    </DropzoneWrapper>
  );
};

export default FileUploaderMultiple;

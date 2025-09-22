
import { useTheme } from "@emotion/react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Icon from "src/@core/components/icon";

const DownloadFile = ({ id }) => {
  const adjuntosSelector = useSelector((store) => store.ghResponde.adjuntos);
  const [fileName, setFileName] = useState("");
  const [type, setType] = useState("");
  const [base64, setBase64] = useState("");
  const theme = useTheme()

  useEffect(() => {
    if (adjuntosSelector.length > 0) {
      adjuntosSelector.forEach((selector) => {
        if (selector["annotationid"] !== undefined && selector["annotationid"] === id) {
          setFileName(selector["filename"]);
          setType(selector["mimetype"]);
          setBase64(selector["documentbody"]);
        }
      });
    }
  }, [adjuntosSelector, id]);

  const downloadBase64File = (contentType, base64Data, fileName) => {
    if (contentType && base64Data && fileName) {
      const linkSource = `data:${contentType};base64,${base64Data}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }
  };

  return (
    <Box component="div" textAlign="center">
      <Tooltip title={<Typography sx={{ color: "inherit" }}>Descargar</Typography>}>
        <IconButton
          color="info"
          aria-label="Descargar"
          onClick={() => downloadBase64File(type, base64, fileName)}
          sx={{ '& svg': { fontSize: 30, color: theme.palette.customColors.icono, cursor: 'pointer' } }}
        >
          <Icon icon="ic:baseline-cloud-download" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default DownloadFile;

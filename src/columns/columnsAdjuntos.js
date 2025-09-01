
import DownloadFile from "@/@core/components/download-File/DownloadFile ";
import { Tooltip, Typography } from "@mui/material";

export const COLUMNS_ADJUNTOS_GHRESPONDE = [
    {
      flex: 0.275,
      minWidth: 300,
      field: "filename",
      headerName: "Adjunto",
      renderCell: (params) => (
        <Tooltip title={params.row.filename}>
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            {params.row.filename}
          </Typography>
        </Tooltip>
      ),
    },
    {
      flex: 0.275,
      minWidth: 200,
      field: "id",
      headerName: "Descargar",
      renderCell: (params) => <DownloadFile id={params.row.id} />,
    },
];
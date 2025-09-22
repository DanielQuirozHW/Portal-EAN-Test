import { Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import Icon from "@/@core/components/icon";
import { useState, useEffect, useContext } from "react";
import ModalFeedback from "@/pages/desempeno/Components/ModalFeedback";
import toast from "react-hot-toast";
import ModalCreditosGlobales from "@/pages/desempeno/Components/ModalCreditosGlobales";
import ModalCreditosPracticaDocente from "@/pages/desempeno/Components/ModalCreditosPracticaDocente";

const handleError = (msj) => {
  toast.error(msj, {
    duration: 2500,
  });
};

const downloadBase64File = (contentType, base64Data, fileName) => {
  if (contentType && base64Data && fileName) {
    const linkSource = `data:${contentType};base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
};

const handleDownload = (annotations) => {
  if (Array.isArray(annotations) && annotations.length > 0) {
    annotations.forEach((annotation) => {
      const { mimetype, documentbody, filename } = annotation;

      // Verificar si el mimetype es PDF antes de intentar descargar
      if (mimetype === "application/pdf") {
        downloadBase64File(mimetype, documentbody, filename);
      } else {
        // Manejar el caso de otros tipos de archivos (opcional)
        handleError(`No se descargará el archivo (${filename}) porque no es un PDF.`);
      }
    });
  } else {
    // Manejar el caso donde no hay annotations
    handleError("No hay annotations para descargar.");
  }
};

const RowOptions = (row) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [openModalFeedback, setOpenModalFeedbacks] = useState(false)

  const rowOptionsOpen = Boolean(anchorEl);

  const handleOpenModalFeedback = () => setOpenModalFeedbacks(!openModalFeedback);
  const handleCloseModalFeedback = () => setOpenModalFeedbacks(!openModalFeedback);

  const handleRowOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRowOptionsClose = () => {
    setAnchorEl(null);
  };

  

  return (
    <>
      <IconButton size="small" onClick={handleRowOptionsClick}>
        <Icon icon="mdi:dots-vertical" />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{ style: { minWidth: "8rem" } }}
      >
        <MenuItem
          key="Completar"
          onClick={() => {
            handleOpenModalFeedback();
            handleRowOptionsClose();
          }}
        >
          Ver
        </MenuItem>
      </Menu>
      {
        openModalFeedback && <ModalFeedback open={openModalFeedback} handleClose={handleCloseModalFeedback} data={row.id} />
      }
    </>
  );
};

const VerCreditos = (row) => {
  const [openModalVerCreditos, setOpenModalVerCreditos] = useState(false);

  const HandleOpenModalVerCreditos = () => {
    setOpenModalVerCreditos(true);
  };
  const HandleCloseModalVerCreditos = () => {
    setOpenModalVerCreditos(false);
  };
  return (
    <>
      <Box>
        <Button size="small" variant="contained" onClick={() => HandleOpenModalVerCreditos()}>
          Ver
        </Button>
      </Box>
      {openModalVerCreditos && (
        <ModalCreditosGlobales open={openModalVerCreditos} handleClose={HandleCloseModalVerCreditos} data={row.data} />
      )}
    </>
  );
};


const VerCreditosPracticaDocente = (row) => {
  const [openModalVerCreditos, setOpenModalVerCreditos] = useState(false);

  const HandleOpenModalVerCreditos = () => {
    setOpenModalVerCreditos(true);
  };
  const HandleCloseModalVerCreditos = () => {
    setOpenModalVerCreditos(false);
  };
  return (
    <>
      <Box>
        <Button size="small" variant="contained" onClick={() => HandleOpenModalVerCreditos()}>
          Ver
        </Button>
      </Box>
      {openModalVerCreditos && (
        <ModalCreditosPracticaDocente open={openModalVerCreditos} handleClose={HandleCloseModalVerCreditos} data={row.data} />
      )}
    </>
  );
};


export const COLUMNS_RESULTADO_GLOBAL = [
  {
    flex: 0.2,
    minWidth: 75,
    field: "_new_periodo_value",
    headerName: "Período",
    renderCell: (params) => (
      <Tooltip title={params.row._new_periodo_value}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row._new_periodo_value}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.2,
    minWidth: 50,
    field: "new_creditostotales",
    headerName: "Créditos totales",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.new_creditostotales}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 250,
    field: "new_desempenio",
    headerName: "Desempeño",
    renderCell: (params) => (
      <Tooltip title={params.row.new_desempenio}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.new_desempenio}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.1,
    minWidth: 130,
    sortable: false,
    field: "actions",
    headerName: "Creditos",
    renderCell: ({ row }) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <VerCreditos data={row} />
      </Box>
    ),
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: "annotations",
    headerName: "Informe",
    renderCell: (params) => (
      (params.row.annotations && params.row.annotations.length > 0) ?
      (
        <Tooltip title={<Typography sx={{ color: "inherit" }}>Informe</Typography>}>
          <IconButton
            color="info"
            aria-label="Descargar"
            onClick={() => handleDownload(params.row.annotations)}
            sx={{ '& svg': { fontSize: 30, cursor: 'pointer' } }}
          >
            <Icon icon="mdi:file-download-outline" />
          </IconButton>
        </Tooltip>
      )
      : ( <p>Sin certificado</p> )
    ),
  },
];

export const COLUMNS_RESULTADO_PRACTICA = [
    {
      flex: 0.2,
      minWidth: 75,
      field: "_new_periodo_value",
      headerName: "Período",
      renderCell: (params) => (
        <Tooltip title={params.row._new_periodo_value}>
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            {params.row._new_periodo_value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      flex: 0.2,
      minWidth: 50,
      field: "new_creditostotales",
      headerName: "Créditos totales",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.new_creditostotales}<span>/70</span>
        </Typography>
      ),
    },
    {
      flex: 0.275,
      minWidth: 250,
      field: "new_desempenio",
      headerName: "Desempeño",
      renderCell: (params) => (
        <Tooltip title={params.row.new_desempenio}>
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            {params.row.new_desempenio}
          </Typography>
        </Tooltip>
      ),
    },
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: "actions",
      headerName: "Creditos",
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <VerCreditosPracticaDocente data={row} />
        </Box>
      ),
    },
];

export const COLUMNS_ACOMPANAMIENTOS = [
  {
    flex: 0.1,
    minWidth: 130,
    sortable: false,
    field: "actions",
    headerName: "Acciones",
    renderCell: ({ row }) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <RowOptions id={row} />
      </Box>
    ),
  },
  {
    flex: 0.2,
    minWidth: 75,
    field: "_new_materia_value",
    headerName: "Materia",
    renderCell: (params) => (
      <Tooltip title={params.row._new_materia_value}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row._new_materia_value}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 250,
    field: "_new_observador_value",
    headerName: "Observador",
    renderCell: (params) => (
      <Tooltip title={params.row._new_observador_value}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row._new_observador_value}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.2,
    minWidth: 50,
    field: "new_fechadelaobservacin",
    headerName: "Fecha de la Observación",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary", textAlign: "center" }}>
        {params.row.new_fechadelaobservacin}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 50,
    field: "new_momentodelaclaseenqueseacompaa",
    headerName: "Momento de la Clase",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.new_momentodelaclaseenqueseacompaa}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 50,
    field: "new_didacticasde1ernivel",
    headerName: "Didácticas de 1er Nivel",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.new_didacticasde1ernivel}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 50,
    field: "new_didctivasde2donivel",
    headerName: "Didácticas de 2do Nivel",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.new_didctivasde2donivel}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 50,
    field: "new_informaciondiferencial",
    headerName: "Diferencial",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.new_informaciondiferencial}
      </Typography>
    ),
  },
];

export const COLUMNS_CREDITOSGLOBALES = [
  {
    flex: 0.2,
    minWidth: 75,
    field: "new_creditosactaulicas",
    headerName: "Act. Áulicas",
    renderCell: (params) => (
      <Tooltip title={params.row.new_creditosactaulicas}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.new_creditosactaulicas}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 250,
    field: "new_creditosactgestion",
    headerName: "Act. Gestión",
    renderCell: (params) => (
      <Tooltip title={params.row.new_creditosactgestion}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.new_creditosactgestion}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 250,
    field: "new_crditosactprodcontenido",
    headerName: "Act. Prod. Contenido",
    renderCell: (params) => (
      <Tooltip title={params.row.new_crditosactprodcontenido}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.new_crditosactprodcontenido}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 250,
    field: "new_creditosactextension",
    headerName: "Act. Extensión",
    renderCell: (params) => (
      <Tooltip title={params.row.new_creditosactextension}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.new_creditosactextension}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 250,
    field: "new_creditosactinvestigacion",
    headerName: "Act. Investigación",
    renderCell: (params) => (
      <Tooltip title={params.row.new_creditosactinvestigacion}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.new_creditosactinvestigacion}
        </Typography>
      </Tooltip>
    ),
  },
  
  
];

export const COLUMNS_CREDITOSPRACTICADOCENTE = [
  {
    flex: 0.2,
    minWidth: 50,
    field: "new_creditosactaulicas",
    headerName: "Act. Áulicas",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary", textAlign: "center" }}>
        {params.row.new_creditosactaulicas}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 50,
    field: "new_creditosactgestion",
    headerName: "Act. Gestión",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.new_creditosactgestion}
      </Typography>
    ),
  },
];

export const COLUMNS_ACTIVIDADESAULICAS = [
  {
    flex: 0.2,
    minWidth: 75,
    field: "new_creditoscoevaluaciones",
    headerName: "Créditos CoEvaluaciones",
    renderCell: (params) => (
      <Tooltip title={params.row.new_creditoscoevaluaciones}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.new_creditoscoevaluaciones}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.275,
    minWidth: 250,
    field: "new_creditosencuestasdocente",
    headerName: "Créditos Encuestas Docente",
    renderCell: (params) => (
      <Tooltip title={params.row.new_creditosencuestasdocente}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.new_creditosencuestasdocente}
        </Typography>
      </Tooltip>
    ),
  },  
];

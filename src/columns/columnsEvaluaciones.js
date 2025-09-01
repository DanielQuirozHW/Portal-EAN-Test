import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import Icon from "@/@core/components/icon";
import CustomChip from "@/@core/components/mui/chip";
import { useState, useEffect, useContext } from "react";
import ModalEvaluaciones from "@/pages/evaluacion-profesoral/components/ModalEvaluaciones";
import { useDispatch, useSelector } from "react-redux";
import { evaluacionPorId } from "@/redux/evaluaciones";
import { AuthContext } from "@/context/AuthContext"
import { useTheme } from "@mui/material";

const getTipoEvaluacion = (estado, label) => {
  switch (estado) {
    case 2:
      return {color: 'info', label: label}
    case 3:
      return {color: 'warning', label: label}
    case 1:
      return {color: 'info', label: label}
    case 6:
      return {color: 'custom', label: label}
    default:
      return {color: 'info', label: 'Evaluación'}
  }
};

const RowOptions = ({row}) => {
  const dispatch = useDispatch();
  const {token} = useContext(AuthContext)
  const theme = useTheme();

  const [openModalEvaluaciones, setOpenModalEvaluaciones] = useState(false)
  const [evaluacionPendiente, setEvaluacionPendiente] = useState([])
  const [idEvaluacion, setIdEvaluacion] = useState('')
  const [itemsEv, setItemsEv] = useState([])
  const evaluacionIdSelector = useSelector(store => store.evaluaciones.evaluacionId)
  const getEvaluacionId = useSelector(store => store.evaluaciones.getEvaluacionId)
  const [loadEvaluacionId, setLoadEvaluacionId] = useState(false)

  useEffect(() => {
    if (evaluacionIdSelector.length > 0) {
      setItemsEv(evaluacionIdSelector)
    } else {
      setItemsEv([])
    }
  }, [evaluacionIdSelector])

  useEffect(() => {
    setLoadEvaluacionId(getEvaluacionId)
  }, [getEvaluacionId])

  const handleOpenModalEvaluaciones = (id) => {
    setEvaluacionPendiente(row);
    setOpenModalEvaluaciones(true);
    setIdEvaluacion(id);
    dispatch(evaluacionPorId(token, id));
  };

  const handleCloseModalEvaluaciones = () => {
    setOpenModalEvaluaciones(false);
    setItemsEv([]);
    setEvaluacionPendiente('');
  };
  
  return (
    <>
      <Tooltip title="Ver Evaluación">
        <IconButton size="small" onClick={() => handleOpenModalEvaluaciones(row.id)}>
          <Icon icon="mdi:eye-outline" fontSize={22} sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }} />
        </IconButton>
      </Tooltip>
      {openModalEvaluaciones && ( 
        <ModalEvaluaciones open={openModalEvaluaciones} handleClose={handleCloseModalEvaluaciones} evaluacionPendiente={evaluacionPendiente} itemsEvaluacion={itemsEv} idEvaluacion={idEvaluacion} data={row} loadingEvaluacion={loadEvaluacionId}/>
      )}
    </>
  );
};
export const COLUMNS_EVALUACIONES_PENDIENTES = [
  {
    // flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: "actions",
    headerName: "Acciones",
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <RowOptions row={row} />
      </Box>
    ),
  },
  {
    flex: 0.3,
    minWidth: 290,
    field: "_new_evaluado_value",
    headerName: "Profesor(a) a Evaluar",
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <Tooltip title={params.row._new_evaluado_value}>
        <Typography variant="body2" sx={{ color: "text.primary", whiteSpace: "normal", wordBreak: "break-word", overflowWrap: "break-word", }}>
          {params.row._new_evaluado_value}
        </Typography>
      </Tooltip>
    ),
  },
  {
    // flex: 0.1,
    minWidth: 200,
    field: "new_tipodeevaluacion",
    headerName: "Tipo de Evaluación",
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => {
      const { color, label } = getTipoEvaluacion(row.new_tipodeevaluacion_value, row.new_tipodeevaluacion);
      const isCustom = color === 'custom';
      return (
        <Tooltip title={row.new_tipodeevaluacion}>
          <Box sx={{ maxWidth: '100%', display: 'flex' }}>
            <CustomChip
              size="medium"
              color={isCustom ? 'default' : color}
              label={label}
              skin="light"
              sx={{
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                "& .MuiChip-label": { textTransform: "capitalize" },
                ...(isCustom && {
                  backgroundColor: '#0484a1',
                  color: '#FFF',
                }),
              }}
            />
          </Box>
        </Tooltip>
      );
    },
  },
  {
    // flex: 0.1,
    minWidth: 120,
    field: "new_anio",
    headerName: "Año",
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <Tooltip title={params.row.new_anio}>
        <Typography variant="body2" sx={{ color: "text.primary"}}>
          {params.row.new_anio}
        </Typography>
      </Tooltip>
    ),
  },
  {
    // flex: 0.1,
    minWidth: 100,
    field: "new_ciclo",
    headerName: "Ciclo",
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <Tooltip title={params.row.new_ciclo.label}>
        <Typography variant="body2" sx={{ color: "text.primary"}}>
          {params.row.new_ciclo.label}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.1,
    minWidth: 270,
    field: "_new_materia_value",
    headerName: "Unidad Académica",
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <Tooltip title={params.row._new_materia_value}>
        <Typography variant="body2" sx={{ color: "text.primary", whiteSpace: "normal", wordBreak: "break-word", overflowWrap: "break-word", }}>
          {params.row._new_materia_value}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.1,
    minWidth: 150,
    field: "new_fechadevencimiento",
    headerName: "Fecha de vencimiento",
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.new_fechadevencimiento}
      </Typography>
    ),
  },
];

export const COLUMNS_EVALUACIONES_COMPVEN = [

  {
    flex: 0.7,
    minWidth: 315,
    field: "_new_evaluado_value",
    headerName: "Profesor(a) Evaluado(a)",
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <Tooltip title={params.row._new_evaluado_value}>
        <Typography variant="body2" sx={{ color: "text.primary", whiteSpace: "normal", wordBreak: "break-word", overflowWrap: "break-word", }}>
          {params.row._new_evaluado_value}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.1,
    minWidth: 200,
    field: "new_tipodeevaluacion",
    headerName: "Tipo de Evaluación",
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => {
      const { color, label } = getTipoEvaluacion(row.new_tipodeevaluacion_value, row.new_tipodeevaluacion);
      const isCustom = color === 'custom';

      return (
        <Tooltip title={row.new_tipodeevaluacion}>
          <Box sx={{ maxWidth: '100%', display: 'inline-flex' }}>
            <CustomChip
              size="medium"
              color={isCustom ? 'default' : color}
              label={label}
              sx={{
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                "& .MuiChip-label": { textTransform: "capitalize" },
                ...(isCustom && {
                  backgroundColor: '#0484a1',
                  color: '#FFF',
                }),
              }}
            />
          </Box>
        </Tooltip>
      );
    },
  },
  {
    // flex: 0.1,
    minWidth: 100,
    field: "new_anio",
    headerName: "Año",
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <Tooltip title={params.row.new_anio}>
        <Typography variant="body2" sx={{ color: "text.primary"}}>
          {params.row.new_anio}
        </Typography>
      </Tooltip>
    ),
  },
  {
    // flex: 0.1,
    minWidth: 90,
    field: "new_ciclo",
    headerName: "Ciclo",
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <Tooltip title={params.row.new_ciclo.label}>
        <Typography variant="body2" sx={{ color: "text.primary"}}>
          {params.row.new_ciclo.label}
        </Typography>
      </Tooltip>
    ),
  },
  {
    flex: 0.1,
    minWidth: 320,
    field: "_new_materia_value",
    headerName: "Unidad Académica",
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <Tooltip title={params.row._new_materia_value}>
        <Typography variant="body2" sx={{ color: "text.primary", whiteSpace: "normal", wordBreak: "break-word", overflowWrap: "break-word", }}>
          {params.row._new_materia_value}
        </Typography>
      </Tooltip>
    ),
  },
  // {
  //   flex: 0.2,
  //   minWidth: 50,
  //   field: "new_valoracionfinal",
  //   headerName: "Valoración final",
  //   renderCell: (params) => (
  //     <Typography variant="body2" sx={{ color: "text.primary" }}>
  //       {params.row.new_valoracionfinal}
  //     </Typography>
  //   ),
  // },
  {
    flex: 0.2,
    minWidth: 100,
    field: "statuscode",
    headerName: "Estado",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.statuscode}
      </Typography>
    ),
  },
];

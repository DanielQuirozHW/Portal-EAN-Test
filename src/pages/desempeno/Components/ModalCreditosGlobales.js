import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Icon from "@/@core/components/icon";
import Table from "@/@core/components/table/Table";
import { COLUMNS_ACTIVIDADESAULICAS, COLUMNS_CREDITOSGLOBALES } from "@/columns/columnsDesempeno";

const ModalCreditosGlobales = ({
  open,
  handleClose,
  data,
}) => {

  const dataArray = Array.isArray(data) ? data : [data];

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      fullWidth={true}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <DialogTitle id="max-width-dialog-title">
          Créditos Globales De la Carrera
        </DialogTitle> */}
        <IconButton
          size="small"
          onClick={() => handleClose()}
          sx={{ position: "absolute", right: "1rem", top: "1rem" }}
        >
          <Icon icon="mdi:close" />
        </IconButton>
      </Box>
      <DialogContent>

        <Grid item xs={12}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5">
              Créditos Globales De la Carrera
            </Typography>
            <Typography variant="body1">
              A continuación, se presenta el desglose de la evaluación por sus componentes:
          </Typography>
          </Box>
          {dataArray ?
            dataArray?.length > 0 ? (
              <Table data={dataArray} columns={COLUMNS_CREDITOSGLOBALES} toolBar={false} />
            ) : (
              <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                No existen registros de — <strong>Créditos Globales De la Carrera</strong>.
              </Alert>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  py: 2,
                }}
              >
                <CircularProgress color="secondary" />
              </Box>
            )}
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5">
              Actividades Aulicas
            </Typography>
            <Typography variant="body1">
            (máx. 60 créditos)


          </Typography>

          </Box>
          {dataArray ?
            dataArray?.length > 0 ? (
              <Table data={dataArray} columns={COLUMNS_ACTIVIDADESAULICAS} toolBar={false} />
            ) : (
              <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                No existen registros de — <strong>Actividades Aulicas</strong>.
              </Alert>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  py: 2,
                }}
              >
                <CircularProgress color="secondary" />
              </Box>
            )}
        </Grid>



      </DialogContent>
    </Dialog>
  );
};

export default ModalCreditosGlobales;

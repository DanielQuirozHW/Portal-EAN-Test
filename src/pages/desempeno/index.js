import { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiTabList from "@mui/lab/TabList";
import { Alert, AlertTitle, Box, CircularProgress, Grid, Typography } from "@mui/material";
import PageHeader from "@/@core/components/page-header";
import { TabPanel } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import Tab from "@mui/material/Tab";
import Table from "@/@core/components/table/Table";
import { COLUMNS_RESULTADO_PRACTICA, COLUMNS_ACOMPANAMIENTOS, COLUMNS_RESULTADO_GLOBAL } from "@/columns/columnsDesempeno";
import useGetResultadosPracDocente from "@/hooks/desempeno/useGetResultadosPracDocente";
import useGetResGlobalCarrera from "@/hooks/desempeno/useGetResGlobalCarrera";
import useGetAcompAulicos from "@/hooks/desempeno/useGetAcompAulicos";
import useGetPracDocenteAnteriores from "@/hooks/desempeno/useGetPracDocenteAnteriores";
import useGetDesempenioAnteriores from "@/hooks/desempeno/useGetDesempenioAnteriores";
import useGetAcompAulicosAnteriores from "@/hooks/desempeno/useGetAcompAulicosAnteriores";

const TabList = styled(MuiTabList)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    color: theme.palette.customColors.subtitle,
    backgroundColor: theme.palette.customColors.subtitle,
  },
  "& .Mui-selected": {
    fontWeight: 600,
    color: `${theme.palette.customColors.subtitle} !important`,
  },
}));

const tabContentList = {};

const Desempeno = () => {
  const { resultadoPractica, loadingResultadoPractica } = useGetResultadosPracDocente();
  const { resultadoPracticasAnteriores, loadPracticasAnteriores } = useGetPracDocenteAnteriores();
  const { resultadoGlobal, loadingResultadoGlobal } = useGetResGlobalCarrera();
  const { desempenioAniosAnteriores, loadDesempenioAniosAnteriores } = useGetDesempenioAnteriores();
  const { acompanamientos, loadingAcompanamientos } = useGetAcompAulicos();
  const { acompanamientosAnteriores, loadingAcompanamientosAnteriores } = useGetAcompAulicosAnteriores();

  const [activeTab, setActiveTab] = useState("practicadocente");
  
  const handleChange = (event, value) => {
    setActiveTab(value);
  };

  return (
    <>
        <Grid container spacing={6}>
            <Grid item xs={12} display="flex" alignItems="center" >
                <PageHeader
                    title={
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Desempeño
                    </Typography>
                    }
                />
            </Grid>
            <Grid item xs={12}>
                <TabContext value={activeTab}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <TabList
                                variant="scrollable"
                                scrollButtons="auto"
                                onChange={handleChange}
                                aria-label="icon tabs example"
                                >
                                <Tab
                                  value="practicadocente"
                                  label={<Box sx={{ display: "flex", alignItems: "center" }}>{"Resultado práctica docente"}</Box>}
                                />
                                <Tab
                                  value="global"
                                  label={<Box sx={{ display: "flex", alignItems: "center" }}>{"Resultado global de carrera"}</Box>}
                                />
                                <Tab
                                  value="acompanamiento"
                                  label={<Box sx={{ display: "flex", alignItems: "center" }}>{"Acompañamientos aulicos"}</Box>}
                                />
                            </TabList>
                            <TabPanel value="practicadocente" sx={{pl: 0}}>
                              <Box mt={2} sx={{pb:7}}>
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        Los siguientes aspectos de evaluación conforman el resultado exclusivo de la práctica docente,
                                        considerando sus actividades áulicas y no áulicas en las distintas modalidades de cursado.
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Los ítems que componen esta valoración son:
                                    </Typography>
                                    <Typography variant="body1">
                                    <strong>Act. Áulicas</strong>: compuesta por la Encuesta docente (50 puntos) y la Coevaluación de pares (10 puntos)
                                    </Typography>
                                    <Typography variant="body1">
                                    <strong> Act. De Gestión</strong>: 10 puntos – Comprende el cumplimiento de obligaciones docentes
                                    </Typography>
                                </Box>
                                
                                {/* Resultado Práctica Docente */}
                                <Grid item xs={12}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="h5">
                                            Resultado Práctica Docente
                                        </Typography>
                                    </Box>
                                    {loadingResultadoPractica ?
                                        resultadoPractica?.length > 0 ? (
                                            <Table data={resultadoPractica} columns={COLUMNS_RESULTADO_PRACTICA} toolBar={false} />
                                        ) : (
                                            <Alert severity="info">
                                                <AlertTitle>Info</AlertTitle>
                                                No existen registros de — <strong>Resultado Práctica Docente</strong>.
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



                                {/* Práctica Docente Años Anteriores */}
                                <Grid item xs={12}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="h5">
                                            Práctica Docente Años Anteriores
                                        </Typography>
                                    </Box>
                                    {loadPracticasAnteriores ?
                                        resultadoPracticasAnteriores?.length > 0 ? (
                                            <Table data={resultadoPracticasAnteriores} columns={COLUMNS_RESULTADO_PRACTICA} toolBar={false} />
                                        ) : (
                                            <Alert severity="info">
                                                <AlertTitle>Info</AlertTitle>
                                                No existen registros de — <strong>Práctica Docente Años Anteriores</strong>.
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


                            </TabPanel>
                            <TabPanel value="global" sx={{pl: 0}}>
                              <Box mt={2} sx={{pb:7}}>
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        Los siguientes aspectos de evaluación conforman el resultado global de la carrera docente, considerando docencia, investigación, extensión y producción de contenidos. De este modo, es posible visualizar la integralidad del quehacer docente.
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Los ítems que componen esta valoración son:
                                    </Typography>
                                    <Typography variant="body1">
                                        Docencia: incorpora <strong>Act. Áulicas</strong>: compuesta por la Encuesta docente (50 puntos), la Coevaluación de pares (10 puntos) y <strong>Act. De Gestión</strong>: 10 puntos – Comprende el cumplimiento de obligaciones docentes
                                    </Typography>
                                    <Typography variant="body1">
                                    <strong>Act. De producción de contenidos</strong>: 10 puntos – Evaluación realizada por MECA
                                    </Typography>
                                    <Typography variant="body1">
                                    <strong>Act. De Extensión</strong>: 10 puntos – Evaluación realizada por Secretaría de Extensión, Vinculación e Impacto
                                    </Typography>
                                    <Typography variant="body1">
                                    <strong>Act. De Investigación</strong>: 10 puntos – Evaluación realizada por el Vicerrectorado de Innovación, Investigación y Postgrado
                                    </Typography>
                                </Box>

                                {/* Resultado Global de Carrera */}
                                <Grid item xs={12}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="h5">
                                            Resultado Global de Carrera
                                        </Typography>
                                    </Box>
                                    { loadingResultadoGlobal ?
                                        resultadoGlobal?.length > 0 ? (
                                            <Table data={resultadoGlobal} columns={COLUMNS_RESULTADO_GLOBAL} toolBar={false} />
                                        ) : (
                                            <Alert severity="info">
                                                <AlertTitle>Info</AlertTitle>
                                                No existen registros de — <strong>Resultado Global de Carrera</strong>.
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


                                {/* Desempeño Años Anteriores */}
                                <Grid item xs={12}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="h5">
                                            Desempeño Años Anteriores
                                        </Typography>
                                    </Box>
                                    {loadDesempenioAniosAnteriores ?
                                        desempenioAniosAnteriores?.length > 0 ? (
                                            <Table data={desempenioAniosAnteriores} columns={COLUMNS_RESULTADO_GLOBAL} toolBar={false} />
                                        ) : (
                                            <Alert severity="info">
                                                <AlertTitle>Info</AlertTitle>
                                                No existen registros de — <strong>Desempeño Años Anteriores</strong>.
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

                            </TabPanel>
                            <TabPanel value="acompanamiento" sx={{pl: 0}}>

                                {/* Acompañamientos Aulicos */}
                                <Grid item xs={12}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="h5">
                                            Acompañamientos Aulicos
                                        </Typography>
                                    </Box>
                                    {loadingAcompanamientos ?
                                        acompanamientos?.length > 0 ? (
                                            <Table data={acompanamientos} columns={COLUMNS_ACOMPANAMIENTOS} toolBar={false} />
                                        ) : (
                                            <Alert severity="info">
                                                <AlertTitle>Info</AlertTitle>
                                                No existen registros de — <strong>Acompañamientos Aulicos</strong>.
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
                                
                                {/* Acompañamientos Aulicos Año Anterior */}
                                <Grid item xs={12}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="h5">
                                            Acompañamientos Aulicos Año Anterior
                                        </Typography>
                                    </Box>
                                    {loadingAcompanamientosAnteriores ?
                                        acompanamientosAnteriores?.length > 0 ? (
                                            <Table data={acompanamientosAnteriores} columns={COLUMNS_ACOMPANAMIENTOS} toolBar={false} />
                                        ) : (
                                            <Alert severity="info">
                                                <AlertTitle>Info</AlertTitle>
                                                No existen registros de — <strong>Acompañamientos Aulicos Año Anterior</strong>.
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


                            </TabPanel>
                        </Grid>
                    </Grid>
                </TabContext>
            </Grid>
        </Grid>
        
    </>
  )
}
export default Desempeno;
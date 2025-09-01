import { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiTabList from "@mui/lab/TabList";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import PageHeader from "@/@core/components/page-header";
import { TabPanel } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import Tab from "@mui/material/Tab";
import Table from "@/@core/components/table/Table";
import { COLUMNS_EVALUACIONES_COMPVEN, COLUMNS_EVALUACIONES_PENDIENTES } from "@/columns/columnsEvaluaciones";
import useGetEvaluacionesPendientes from "@/hooks/evaluaciones/useGetEvaluacionesPendientes";
import useGetMisEvaluaciones from "@/hooks/evaluaciones/useGetMisEvaluaciones";

const TabList = styled(MuiTabList)(({ theme }) => ({
    "& .MuiTabs-indicator": {
        color: theme.palette.customColors.subtitle,
        backgroundColor: theme.palette.customColors.subtitle,
    },
    "& .Mui-selected": {
        fontWeight: 600,
        color: `${theme.palette.customColors.subtitle} !important`,
    
    },
    "& .MuiTab-root": {
        // Color de texto de todos los tabs
        color: theme.palette.mode === "dark" ? "#F5F5F5" : "#444",
        // Tab no seleccionado:
        "&:not(.Mui-selected)": {
        color: theme.palette.mode === "dark" ? "#F5F5F5" : "#666",
        },
        transition: "background .25s, color .25s",
        borderRadius: 6,
        marginRight: 8,
        minHeight: 44,
        minWidth: 180,
    }
}));

const tabContentList = {};

const Evaluaciones = () => {
    const {evaluacionesPendientes, loadingEvaluacionesPendientes} = useGetEvaluacionesPendientes();
    const { evaluacionesCV, loadingEvaluacionesCV } = useGetMisEvaluaciones();

    const [activeTab, setActiveTab] = useState("pendientes");
    
    const handleChange = (event, value) => {
      setActiveTab(value);
    };
 

    return (
        <>
            <Grid container spacing={6}>
                <Grid item xs={12} display="flex" alignItems="center" >
                   <PageHeader
                        title={
                            <>
                                <strong>🚀 Tu Voz Transforma la Educación (Evaluación profesoral)</strong> 
                            </>
                        }
                        subtitle={
                            <>
                                <Typography component="p" fontWeight="bold" sx={{ mt: 3 }}>📢 Habla claro, sé constructivo, sé objetivo</Typography>
                                {/* <Typography component="p" sx={{ mb: 3 }}>(Usa este espacio como si estuvieras dando consejo a un futuro estudiante)</Typography>
                                <Typography component="p">
                                    <strong>🔍 "Pero... ¿realmente leen estas evaluaciones?"</strong><br />
                                    Sí, y van más allá: Cada semestre ajustamos capacitaciones, reconocemos a los mejores profesores evaluados y cocreamos mejores experiencias gracias a respuestas como la tuya.
                                </Typography> */}
                            </>
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
                                        value="pendientes"
                                        label={<Box sx={{ display: "flex", alignItems: "center" }}>{"Mis evaluaciones pendientes de completar"}</Box>}
                                    />
                                    <Tab
                                        value="completas"
                                        label={<Box sx={{ display: "flex", alignItems: "center" }}>{"Mis Evaluaciones completadas y vencidas"}</Box>}
                                    />
                                </TabList>
                                <TabPanel value="pendientes" sx={{pl: 0}}>
                                    {loadingEvaluacionesPendientes ? (
                                        <Table data={evaluacionesPendientes} columns={COLUMNS_EVALUACIONES_PENDIENTES} pageSize={50} />
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
                                </TabPanel>
                                <TabPanel value="completas" sx={{pl: 0}}>
                                    {loadingEvaluacionesCV ? (
                                        <Table data={evaluacionesCV} columns={COLUMNS_EVALUACIONES_COMPVEN} pageSize={50} />
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
                                </TabPanel>
                            </Grid>
                        </Grid>
                    </TabContext>
                </Grid>
            </Grid>
            
        </>
    )
}
export default Evaluaciones;
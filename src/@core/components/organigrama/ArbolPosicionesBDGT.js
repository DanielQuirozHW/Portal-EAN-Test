import React, { useEffect, useRef, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Tooltip,
    Box,
    Button,
} from "@mui/material";
import { Tree } from "react-organizational-chart";
import { TreeNode } from "react-organizational-chart";
import { useReactToPrint } from "react-to-print";
import { useTheme } from "@emotion/react";

const logo = "/images/logo_color.png";

const ArbolPosicionBDGT = ({ organigrama, direccion, secretaria, gerencia, nivel}) => {
    const theme = useTheme()

    const [root, setRoot] = useState(null);

    const componentRef = useRef();

    
    useEffect(() => {
        if (organigrama) {
            setRoot(organigrama);
        } else {
            setRoot(null);
        }
    }, [organigrama]);

    useEffect(() => {
      const style = document.createElement("style");
      style.type = "text/css";
      style.innerHTML = `
          @media print {
            .tree-node {
                background-color: #1c1c1c !important;
                -webkit-print-color-adjust: exact;
            }
            .tree-label {
              font-size: 30px;
              font-weight: bold;
              text-align: center;
              margin-top: 100px;
              margin-bottom: 12px;
              color: rgb(0, 98, 80) !important;
              text-transform: uppercase; 
              -webkit-print-color-adjust: exact;
            }
            .print-only {
              display: block !important;
              position: absolute;
              top: 30px;
              right: 30px;
              width: 300px;
              height: auto;
            }
            .print-only-filters {
              display: block !important;
              position: absolute;
              top: 25px;
              left: 30px;
              color: #181818;
              font-size: 30px;
              font-weight: bold;
            }
            div {
                overflow: hidden !important; /* Oculta todo el overflow */
            }
            .tree-container {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh; /* Altura total de la página de impresión */
              margin: 0 auto; /* Centramos horizontalmente */
            }
          }
          .print-only, .print-only-filters {
            display: none;
          }
      `;
      document.head.appendChild(style);

      return () => {
          document.head.removeChild(style); // limpia estilos post impresión
      };
  }, []);

    const renderNode = (node) => {

        if (!node || !node.children) {
            return null;
        } 

        return (
            <>
                {node.children.map((child) => (
                    <TreeNode
                        key={child.id}
                        style={{ justifyContent: "center" }}
                        label={
                            <div style={{ textAlign: "center" }}>
                                <Grid container direction="column" alignItems="center">
                                    <Card
                                        className="tree-node"
                                        sx={{
                                            maxWidth: "400px",
                                            margin: "8px",
                                            textAlign: "center",
                                            backgroundColor: theme.palette.mode === 'dark' ? '#1c1c1c' : '#fff',
                                        }}
                                    >
                                        <CardContent>
                                            <Tooltip title={child.new_name} arrow>
                                                <Typography variant="subtitle1" sx={{ 
                                                  mt: 1, 
                                                  display: "-webkit-box",
                                                  WebkitLineClamp: child.new_name?.length > 20 ? 3 : 1,
                                                  WebkitBoxOrient: "vertical",
                                                  overflow: child.new_name?.length > 20 ? "hidden" : "visible",
                                                  textOverflow: child.new_name?.length > 20 ? "ellipsis" : "unset",
                                                  whiteSpace: child.new_name?.length > 20 ? "normal" : "nowrap",
                                                  minWidth: child.new_name?.length > 20 ? "150px" : "0",
                                                  textAlign: "center",
                                                  color:"rgb(8, 171, 156)",
                                                }}>
                                                    {child.new_name}
                                                </Typography>
                                            </Tooltip>
                                            <Typography variant="subtitle2" sx={{ mt: 1, color: theme.palette.mode === 'dark' ? theme.palette.grey[300]  : theme.palette.grey[700]  }}>
                                                {(child._new_empleadoactual_value) ? child._new_empleadoactual_value : "Posición Vacante"}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </div>
                        }
                    >
                        {renderNode(child)}
                    </TreeNode>
                ))}
            </>
        );
    };

    
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

  return (
    <>
      <Box display="flex" justifyContent="center" mb={2}>
        <Button variant="contained" color="primary" onClick={handlePrint}>
          Imprimir Organigrama
        </Button>        
      </Box>
      <div ref={componentRef} className="tree-container" style={{ overflow: 'auto', maxWidth: '95%', margin: 'auto', paddingBottom: 15}}>
        <img src={logo} alt="Logo" className="print-only" />
        {
          (direccion || secretaria || gerencia) && (
            <Box className="print-only-filters">
              {secretaria && secretaria.label}
              {direccion && (secretaria ? ' - ' + direccion.label : direccion.label)}
              {gerencia && (direccion || secretaria ? ' - ' + gerencia.label : gerencia.label)}
              {nivel.length > 0 && (nivel.length == 1 ? '. Nivel' : '. Niveles') + ': ' + nivel.map(n => n.label).join(', ') }
            </Box>
          )
        }
        <Tree
          label={
            <Typography variant="h5" color="inherit" sx={{ paddingBottom: "6px" }} className="tree-label">
              Organigrama
            </Typography>
          }
          lineColor="#ccc"
          lineWidth="2px"
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {root ? renderNode(root) : null}
        </Tree>
      </div>
    </>
    )
}

export default ArbolPosicionBDGT
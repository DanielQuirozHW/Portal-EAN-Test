import React from 'react'
import { Box, Dialog, IconButton, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Icon from "@/@core/components/icon";

const ModalFeedback = ({ open, handleClose, data }) => {
    
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}                
                aria-labelledby="max-width-dialog-title"
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <DialogTitle id="max-width-dialog-title">Créditos Globales De la Carrera</DialogTitle>
                    <IconButton
                        size="small"
                        onClick={() => handleClose()}
                        sx={{ position: "absolute", right: "1rem", top: "1rem" }}
                    >
                        <Icon icon="mdi:close" />
                    </IconButton>
                </Box>
                <DialogContent>
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
                        <DialogContentText>{data.new_comentariosyfeedbackfinal}</DialogContentText>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}
export default ModalFeedback
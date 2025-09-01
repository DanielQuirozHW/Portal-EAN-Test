// ** MUI Imports
import { Grid, Typography, useTheme } from "@mui/material"
import React from "react"

const PageHeader = ({ title, subtitle }) => {
  const theme = useTheme()
  return (
    <Grid item xs={12}>
      <Typography variant="h5" sx={{ mb: "5px" }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" component="div" sx={{ color: theme.palette.customColors.subtitle, fontWeight: "bold", fontSize: "0.90rem" }}
      >
        {subtitle}
      </Typography>
    </Grid>
  )
}

export default PageHeader

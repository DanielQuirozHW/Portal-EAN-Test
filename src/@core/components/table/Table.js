import { useState } from "react";
import Card from "@mui/material/Card";
import { DataGrid, esES } from "@mui/x-data-grid";
import QuickSearchToolbar from "../../../@core/components/table/QuickSearchToolbar";
import { Divider, Grid, Typography, Box } from "@mui/material";
import { useTheme } from "@emotion/react";

const Table = ({ data, columns, name, addRow, toggle, toolBar = false, pageSize = 10, autoHeightRows = false }) => {
  const theme = useTheme()
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: pageSize,
  });

  const totalRecords = filteredData.length ? filteredData.length : data.length;

  const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };
  const handleSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");

    const filteredRows = data.filter((row) => {
      return Object.keys(row).some((field) => {
        const fieldValue = row[field];
        if (fieldValue !== undefined && fieldValue !== null) {
          // Verificar si fieldValue no es undefined ni null antes de llamar a toString()
          return searchRegex.test(fieldValue.toString());
        }
        return false; // Si fieldValue es undefined o null, no realizar la búsqueda
      });
    });
    if (searchValue.length) {
      setFilteredData(filteredRows);
    } else {
      setFilteredData([]);
    }
  };

  const generatePageSizeOptions = () => {
    let options = [];
    for (let i = 1; i <= 4; i++) {
      let size = pageSize * i;
      if (size <= totalRecords) {
        options.push(size);
      } else {
        break;
      }
    }
    if (!options.includes(totalRecords)) {
      options.push(totalRecords);
    }
    return options;
  };

  return (
    <Card sx={{ backgroundColor: theme.palette.customColors.table }}>
      <Grid container sx={{ px: 5, pt: 4, pb: 1 }}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            {name}
          </Typography>
        </Grid>
      </Grid>
      <Divider
        sx={{
          borderBottomWidth: 3,
          opacity: 0.8,
          mb: 2,
          pb: 1,
        }}
      />
      <Box sx={{ width: "100%", overflowX: "auto" }}>
      <DataGrid
        getRowId={(row) => row.id || row.tempId}
        // getRowId={(row) => row.id}
        autoHeight
        rowHeight={autoHeightRows ? null : 42} // ✅ Condicional
        getRowHeight={autoHeightRows ? () => "auto" : undefined} // ✅ Condicional
        columnHeaderHeight={45}
        headerHeight={36}
        hideFooterSelectedRowCount= {true}
        rows={filteredData.length ? filteredData : data}
        columns={columns}
        // pageSizeOptions={[pageSize, pageSize*2, pageSize*3, pageSize*4]}
        pageSizeOptions={generatePageSizeOptions()} 
        paginationModel={paginationModel}
        slots={{ toolbar: toolBar && QuickSearchToolbar }}
        onPaginationModelChange={setPaginationModel}
        slotProps={{
          baseButton: {
            variant: "outlined",
          },
          toolbar: {
            value: searchText,
            clearSearch: () => handleSearch(""),
            onChange: (event) => handleSearch(event.target.value),
            addRow: addRow, //Booleano que permite que se renderize el boton
            toggle: toggle, // Funcion que dispara la apertura de modal/drawer
          },
        }}
        localeText={esES}
        // localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        sx={{
          ...(autoHeightRows && {
            '& .MuiDataGrid-cell': {
              py: 2,
              alignItems: 'center',
            },
          }),
          '& .MuiDataGrid-cell': {
            display: 'flex',
            alignItems: 'center',
          },
        }}
      />
      </Box>
    </Card>
  );
};

export default Table;

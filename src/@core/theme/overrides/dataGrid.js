const DataGrid = () => {
  return {
    MuiDataGrid: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: 0,
          color: theme.palette.text.primary,
          '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none'
          },
          '& ::-webkit-scrollbar': {
            width: '10px',
            height: '10px'
          },
          '& ::-webkit-scrollbar-track': {
            background: theme.palette.action.hover
          },
          '& ::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.action.disabled,
            borderRadius: '10px',
            border: `2px solid ${theme.palette.action.hover}`,
            '&:active': {
              backgroundColor: theme.palette.action.active
            }
          }
        }),
        toolbarContainer: ({ theme }) => ({
          paddingRight: `${theme.spacing(5)} !important`,
          paddingLeft: `${theme.spacing(3.25)} !important`
        }),
        columnHeaders: ({ theme }) => ({
          // backgroundColor: theme.palette.customColors.tableHeaderBg
        }),
        columnHeader: ({ theme }) => ({
          '&:not(.MuiDataGrid-columnHeaderCheckbox)': {
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
            '&:first-of-type': {
              paddingLeft: theme.spacing(5)
            }
          },
          '&:last-of-type': {
            paddingRight: theme.spacing(5)
          }
        }),
        columnHeaderCheckbox: {
          maxWidth: '58px !important',
          minWidth: '58px !important'
        },
        columnHeaderTitleContainer: {
          padding: 0
        },
        columnHeaderTitle: {
          fontWeight: 600,
          fontSize: '0.85rem',
          letterSpacing: '0.17px',
          // textTransform: 'uppercase'
        },
        columnSeparator: ({ theme }) => ({
          color: theme.palette.divider
        }),
        row: {
          transition: 'background-color 0.3s ease',
          '&:last-child': {
            '& .MuiDataGrid-cell': {
              borderBottom: 0
            }
          }
        },
        cell: ({ theme }) => ({
          borderColor: theme.palette.divider,
          '&:not(.MuiDataGrid-cellCheckbox)': {
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
            '&:first-of-type': {
              paddingLeft: theme.spacing(5)
            }
          },
          '&:last-of-type': {
            paddingRight: theme.spacing(5)
          },
          '&:focus, &:focus-within': {
            outline: 'none'
          }
        }),
        cellCheckbox: {
          maxWidth: '58px !important',
          minWidth: '58px !important'
        },
        editInputCell: ({ theme }) => ({
          padding: 0,
          color: theme.palette.text.primary,
          '& .MuiInputBase-input': {
            padding: 0
          }
        }),
        footerContainer: ({ theme }) => ({
          borderTop: `1px solid ${theme.palette.divider}`,
          '& .MuiTablePagination-toolbar': {
            paddingLeft: `${theme.spacing(4)} !important`,
            paddingRight: `${theme.spacing(4)} !important`
          },
          '& .MuiTablePagination-displayedRows, & .MuiTablePagination-selectLabel': {
            color: theme.palette.text.primary
          }
        }),
        selectedRowCount: ({ theme }) => ({
          margin: 0,
          paddingLeft: theme.spacing(4),
          paddingRight: theme.spacing(4)
        }),
        virtualScroller: ({ theme }) => ({
          '&::-webkit-scrollbar': {
            width: '10px',
            height: '10px'
          },
          '&::-webkit-scrollbar-thumb:active': {
            backgroundColor: theme.palette.primary.main
          }
        }),
      }
    }
  }
}

export default DataGrid

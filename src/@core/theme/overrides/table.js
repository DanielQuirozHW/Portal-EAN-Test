const Table = () => {
  return {
    MuiTableContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: theme.shadows[0],
          borderTopColor: theme.palette.divider
        })
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          '& .MuiTableCell-head': {
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.13px'
          }
        }
      }
    },
    MuiTableBody: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiTableCell-body': {
            letterSpacing: '0.25px',
            color: theme.palette.text.secondary,
            '&:not(.MuiTableCell-sizeSmall):not(.MuiTableCell-paddingCheckbox):not(.MuiTableCell-paddingNone)': {
              paddingTop: theme.spacing(3.5),
              paddingBottom: theme.spacing(3.5)
            }
          }
        })
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiTableCell-head:not(.MuiTableCell-paddingCheckbox):first-child, & .MuiTableCell-root:not(.MuiTableCell-paddingCheckbox):first-child ':
            {
              paddingLeft: theme.spacing(5)
            },
          '& .MuiTableCell-head:last-child, & .MuiTableCell-root:last-child': {
            paddingRight: theme.spacing(5)
          }
        })
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderBottom: `1px solid ${theme.palette.divider}`,
          fontSize: "0.8rem",
          padding: theme.spacing(1, 2),
        }),
        paddingCheckbox: ({ theme }) => ({
          paddingLeft: theme.spacing(2)
        }),
        stickyHeader: ({ theme }) => ({
          backgroundColor: theme.palette.customColors.tableHeaderBg
        })
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
          fontWeight: "500",
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        toolbar: {
          fontSize: "0.75rem",
        },
        selectLabel: {
          fontSize: "0.75rem",
        },
        displayedRows: {
          fontSize: "0.75rem",
        },
        select: {
          fontSize: "0.75rem",
        },
      },
    },
  };
};

export default Table

import { createTheme, ThemeProvider } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiPagination: {
      styleOverrides: {
        outlined: {
          "& .MuiPaginationItem-outlined": {
            color: "#dc3545", // Set text color to red
            borderColor: "#dc3545", // Set border color to red
          },
          "& .MuiPaginationItem-outlined.Mui-selected": {
            backgroundColor: "#dc3545",
            color: "#fff",
          },
        },
      },
    },
  },
});

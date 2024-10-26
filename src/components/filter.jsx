import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { message } from "antd"; // Import Ant Design message

export default function Filter({ onFilterChange }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOptions([...FilterProducts]);
    }, 1000);
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  const handleFilterChange = (event, newValue) => {
    if (newValue) {
      onFilterChange(newValue.value); // Pass the selected filter option back to the parent component
      message.success(`Filtered by ${newValue.title} successfully!`); // Show success message
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
      {" "}
      {/* Center the filter and add margin-bottom */}
      <Autocomplete
        sx={{
          width: 200, // Increased width
          "& .MuiOutlinedInput-root": {
            borderRadius: "5px", // Reduced border radius
            "& fieldset": {
              borderColor: "#dc3545", // Border color
            },
            "&:hover fieldset": {
              borderColor: "#dc3545", // Darker border on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#dc3545", // Border color when focused
            },
            // Reduced height
            "& input": {
              height: "20px", // Set input height
            },
          },
          "& .MuiInputLabel-root": {
            fontSize: "14px", // Label font size
            color: "black", // Label color
          },
          "& .MuiAutocomplete-inputRoot": {
            fontSize: "15px", // Input text size
            padding: "5px 10px", // Padding for input field
          },
        }}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={handleFilterChange} // Capture the selected value
        isOptionEqualToValue={(option, value) => option.title === value.title}
        getOptionLabel={(option) => option.title}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Filter by Price"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress
                      color="primary"
                      size={24}
                      sx={{ mr: 2 }}
                    /> // Larger loader size with margin
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
}

const FilterProducts = [
  { title: "Rent Low First", value: "rentLow" },
  { title: "Rent High First", value: "rentHigh" },
  { title: "Buy Price Low First", value: "buyLow" },
  { title: "Buy Price High First", value: "buyHigh" },
];

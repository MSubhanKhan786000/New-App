import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Input } from "antd";
import { getMenuItems } from "../services/common";

export default function AdvancedFilter({
  onFilterChange, // Existing prop
  onSearchTextChange, // New prop
  onCategoryChange, // New prop
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [menuItems, setMenuItems] = React.useState([]);
  const [activeMenuItem, setActiveMenuItem] = React.useState(null);
  const [activeLink, setActiveLink] = React.useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLinkClick = (category) => {
    setActiveLink(category);
    setActiveMenuItem(null); // Reset active menu item
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  const handleMenuItemClick = (categoryName) => {
    setActiveMenuItem(categoryName);
    setActiveLink(""); // Reset active link
    if (onCategoryChange) {
      onCategoryChange(categoryName);
    }
  };

  React.useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await getMenuItems();
        if (response && response.success && Array.isArray(response.data)) {
          setMenuItems(response.data);
        } else {
          console.error("Expected success and an array but got:", response);
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  // Get unique menu item names
  const uniqueMenuItems = Array.from(
    new Set(menuItems.map((item) => item.name))
  ).map((name) => menuItems.find((item) => item.name === name));

  return (
    <Card
      sx={{ maxWidth: 400, margin: "20px auto", border: "1px solid #dc3545" }}
    >
      <CardHeader
        title="Search by Category"
        sx={{
          textAlign: "center",
          typography: "subtitle2",
        }}
      />
      <Input.Search
        placeholder="Input search text"
        allowClear
        style={{ width: 200, marginBottom: "10px", marginLeft: "20px" }}
        onChange={(e) => {
          if (onSearchTextChange) {
            onSearchTextChange(e.target.value);
          }
        }}
      />
      <CardContent>
        <Typography>Select Category</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          <Typography
            onClick={() => handleLinkClick("Men's Collection")}
            style={{
              color: activeLink === "Men's Collection" ? "#dc3545" : "black",
              cursor: "pointer",
            }}
          >
            Men's Collection
          </Typography>
          <Typography
            onClick={() => handleLinkClick("Women's Collection")}
            style={{
              color: activeLink === "Women's Collection" ? "#dc3545" : "black",
              cursor: "pointer",
            }}
          >
            Women's Collection
          </Typography>
        </div>
      </CardActions>
      <CardContent>
        {uniqueMenuItems.length > 0 ? (
          uniqueMenuItems.map((item) => (
            <Typography
              key={item._id}
              onClick={() => handleMenuItemClick(item.name)}
              style={{
                marginBottom: "5px",
                color: activeMenuItem === item.name ? "#dc3545" : "black",
                cursor: "pointer",
              }}
            >
              {item.name}
            </Typography>
          ))
        ) : (
          <Typography>No menu items available.</Typography>
        )}
      </CardContent>
    </Card>
  );
}

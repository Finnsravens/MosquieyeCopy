import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useLocation } from "react-router-dom"; // Import necessary hooks
import "react-pro-sidebar/dist/css/styles.css";
import { useState, useEffect } from "react"; // Import useState and useEffect
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ScannerIcon from '@mui/icons-material/Scanner';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import CompareIcon from '@mui/icons-material/Compare';
import QrCodeIcon from "@mui/icons-material/QrCode";
import { useUser } from '@clerk/clerk-react';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Link to={to}>
        <Typography>{title}</Typography>
      </Link>
    </MenuItem>
  );
};

const Sidebar = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isSignedIn, user, isLoaded } = useUser();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const location = useLocation();

  const userRole = user?.organizationMemberships?.[0]?.role;
  useEffect(() => {
    // Update the selected state based on the current path
    const path = location.pathname;
    if (path === "/dashboard") {
      setSelected("Dashboard");
    } else if (path === "/team") {
      setSelected("Manage Team");
    } else if (path === "/contacts") {
      setSelected("Contacts Information");
    } else if (path === "/invoices") {
      setSelected("Invoices Balances");
    } else if (path === "/form") {
      setSelected("Profile Form");
    } else if (path === "/calendar") {
      setSelected("Calendar");
    } else if (path === "/faq") {
      setSelected("FAQ Page");
    } else if (path === "/bar") {
      setSelected("Bar Chart");
    } else if (path === "/pie") {
      setSelected("Pie Chart");
    } else if (path === "/line") {
      setSelected("Line Chart");
    } else if (path === "/geography") {
      setSelected("Geography Chart");
    } else if (path === "/scan") {
      setSelected("Scan");
    } else if (path === "/qrscan") { // Add this line if you have a specific route for QR scan
      setSelected("QR Scan");
    }
  }, [location.pathname]); // Re-run this effect whenever the route changes

  // Don't render sidebar on mobile
  if (isMobile) {
    return null;
  }

  if (!isLoaded) {
    return null;
  }

  // Don't show the sidebar when on the login page
  if (location.pathname === "/") {
    return null; // Don't render the sidebar if on the login page
  }

  console.log("Current user role:", userRole);
  console.log("User object:", user);
  console.log("Organization memberships:", user?.organizationMemberships);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  MOSQUIEYE
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb={isMobile ? "15px" : "25px"}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width={isMobile ? "80px" : "100px"}
                  height={isMobile ? "80px" : "100px"}
                  src={user.imageUrl || "https://via.placeholder.com/120"}
                  style={{ 
                    cursor: "pointer", 
                    borderRadius: "50%",
                    padding: isMobile ? "5px" : "0"
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant={isMobile ? "h3" : "h2"}
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: isMobile ? "5px 0 0 0" : "10px 0 0 0" }}
                >
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography 
                  variant={isMobile ? "h6" : "h5"} 
                  color={colors.greenAccent[500]}
                >
                  {userRole?.replace('org:', '').split('_').map(
                    word => word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Recent Total Eggs"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Scan"
              to="/scan"
              icon={<CompareIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="QR Scan" // Add the QR Scan item here
              to="/qrscan" // Ensure this matches your routing
              icon={<QrCodeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Map"
              to="/maps"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

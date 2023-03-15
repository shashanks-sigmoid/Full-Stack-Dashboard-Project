import { Box } from "@mui/material";
import SideBar from "../features/sidebar/SideBar";
import ResponsiveAppBar from "../features/user/ResponsiveAppBar";




const UI = () => {
    return (
        <Box
            display="flex"
            flexDirection='column'
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            backgroundColor="primary.main"
        >
            <ResponsiveAppBar />
            <SideBar />

        </Box>
    );
};
export default UI;
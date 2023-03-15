import { ThemeProvider, createTheme, CssBaseline, Grid, Box } from "@mui/material";
import DetailPreview from "./features/details/DetailPreview";
import { useSelector } from 'react-redux'
import SavedQueries from "./features/details/SavedQueries";
import SideBar from "./features/sidebar/SideBar";
import ResponsiveAppBar from "./features/user/ResponsiveAppBar";
import FooterCopyRight from "./features/footers/FooterCopyRight";


const theme = createTheme({
  palette: {
    primary: {
      main: "#1f2937",
      white: "#ffffff",
    },
    text: {
      main: "#FF0081",
      secondary: "#46596A",
    },
    secondary: {
      main: "#46596A"
    },
    white: {
      main: "#ffffff"
    },
    btnColor: {
      main: "rgba(252,0,127,0.15)",
    }
  },
  typography: {
    fontFamily: ["Hind Siliguri"],
  }
});

function App() {

  const sideBar = useSelector(state => state.sideBar);
  const toggle = sideBar.toggle;

  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <Box>
          <Grid
            container
            rowSpacing={0}
            height='100%'
          >
            <Grid item xs={12} md={12} borderBottom='1px solid gray'>
              <ResponsiveAppBar />
            </Grid>
            <Grid height='100%' item xs={2} md={2} padding='1rem'>
              <SideBar />
            </Grid>
            <Grid display='flex' flexDirection='column' height='100%' item xs={10} md={10} borderLeft='1px solid gray' padding='1rem'>
              {toggle ? <DetailPreview /> : <SavedQueries />}
            </Grid>
            <Grid item xs={12} md={12}>
              <FooterCopyRight />
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;

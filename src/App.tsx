import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import Home from "./pages/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import About from "./pages/Favorites";
import UserRecipes from "./pages/UserRecipes";
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar";
import useRecipe from "./hooks/useRecipe";
import { AuthContextProvider, UserAuth } from "./AuthContext";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";
// import useRecipe from "./hooks/useRecipe";

const queryClient = new QueryClient();

export default function App() {
  const [colorMode, theme] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <AuthContextProvider>
              <NavBar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <Favorites />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/userRecipes"
                  element={
                    <ProtectedRoute>
                      <UserRecipes />
                    </ProtectedRoute>
                  }
                />
                <Route path="/auth" element={<Auth />} />
              </Routes>
              <ReactQueryDevtools />
            </AuthContextProvider>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </ColorModeContext.Provider>
  );
}

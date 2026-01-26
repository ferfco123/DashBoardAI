import "./App.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { ThemeContex } from "./Context/ThemeContext";
import { useContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InsightsDashboard from "./Pages/InsightsDashboard/InsightsDashboard";
import Snapshots from "./Pages/Snapshots/Snapshots";

function App() {
  const { mode } = useContext(ThemeContex);
  const queryClient = new QueryClient();
  const Layout = () => {
    return (
      <div className={mode === "light" ? "layout light" : "layout"}>
        <Navbar />
        <div className="layoutContainer">
          <div className="layoutOtulet">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },

        {
          path: "/insights",
          element: <InsightsDashboard />,
        },
        {
          path: "/snapshots",
          element: <Snapshots />,
        },
      ],
    },
  ]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;

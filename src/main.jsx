import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "preline";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import MissingPage from "./pages/MissingPage.jsx";
import { StrictMode, lazy } from "react";

const GetQuotePage = lazy(() => import("./pages/GetQuotePage.jsx"));
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const RepairShops = lazy(() => import("./pages/RepairShops.jsx"));
const SingleShop = lazy(() => import("./pages/SingleShop.jsx"));
const FindRepairShops = lazy(() => import("./pages/FindRepairShops.jsx"));
const SearchSingleShop = lazy(() => import("./pages/SearchSingleShop.jsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} errorElement={<ErrorPage />}>
        <Route index element={<HomePage />} />
        <Route path="repairshops" element={<RepairShops />} />
        <Route path="repairshops/profile/:id" element={<SingleShop />} />
        <Route path="repairshops/:location" element={<RepairShops />} />
        <Route
          path="repairshops/:location/profile/:id"
          element={<SingleShop />}
        />
        <Route path="search/" element={<FindRepairShops />} />
        <Route path="search/profile/:id" element={<SearchSingleShop />} />
        <Route path="getquote" element={<GetQuotePage />} />
      </Route>
      <Route path="*" element={<MissingPage />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

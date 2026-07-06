import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { RequireAuth } from "./RequireAuth";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import ModelsPage from "@/pages/ModelsPage";
import NewModelPage from "@/pages/NewModelPage";
import ModelDetailsPage from "@/pages/ModelDetailsPage";
import AnalyticsPage from "@/pages/AnalyticsPage";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/", element: <DashboardPage /> },
          { path: "/models", element: <ModelsPage /> },
          { path: "/models/new", element: <NewModelPage /> },
          { path: "/models/:id", element: <ModelDetailsPage /> },
          { path: "/models/:id/edit", element: <NewModelPage /> },
          { path: "/analytics", element: <AnalyticsPage /> },
        ],
      },
    ],
  },
]);

import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Navigate, Outlet } from '@tanstack/react-router';
import { BackToTop } from '../components/BackToTop/BackToTop';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { ThemeProvider } from '../ThemeContext/ThemeProvider';

type RouterContext = {
  queryClient: QueryClient;
};

const RootLayout = () => (
  <ThemeProvider>
    <Header />
    <Outlet />
    <Footer />
    <BackToTop />
  </ThemeProvider>
);

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: () => <Navigate to="/" replace />,
});

import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));
const InvestingFundamentals = Loadable(lazy(() => import('pages/InvestingFundamentals')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
const Company = Loadable(lazy(() => import('pages/Company')));
const CompanySelection = Loadable(lazy(() => import('pages/CompanySelection')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <CompanySelection />,
    },
    {
      path: 'color',
      element: <Color />,
    },
    {
      path: 'investing-fundamentals',
      element: <InvestingFundamentals />,
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: 'sample-page',
      element: <SamplePage />,
    },
    {
      path: 'shadow',
      element: <Shadow />,
    },
    {
      path: 'typography',
      element: <Typography />,
    },
    {
      path: 'icons/ant',
      element: <AntIcons />,
    },
    {
      path: 'company',
      children: [
        {
          path: '',
          element: <CompanySelection />,
        },
        {
          path: ':companyTicker',
          element: <Company />,
        },
      ],
    },
  ],
};

export default MainRoutes;

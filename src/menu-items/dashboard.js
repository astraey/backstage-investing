// assets
import { DashboardOutlined, PieChartOutlined, AreaChartOutlined, BookOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  PieChartOutlined,
  BookOutlined,
  AreaChartOutlined,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'company',
      title: 'Company Page',
      type: 'item',
      url: '/',
      icon: icons.AreaChartOutlined,
      breadcrumbs: false,
    },
    {
      id: 'fundamentals',
      title: 'Investing Fundamentals',
      type: 'item',
      url: '/investing-fundamentals',
      icon: icons.BookOutlined,
      breadcrumbs: false,
    },
    /*
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
    */
  ],
};

export default dashboard;

// assets
import { DashboardOutlined, PieChartOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  PieChartOutlined,
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
      icon: icons.PieChartOutlined,
      breadcrumbs: false,
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;

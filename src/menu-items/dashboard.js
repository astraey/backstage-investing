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
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
    {
      id: 'company',
      title: 'Company Page',
      type: 'item',
      url: '/company',
      icon: icons.PieChartOutlined,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;

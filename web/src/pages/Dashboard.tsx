import React from 'react';

import Sidebar from '../components/Sidebar';
import style from '../styles/pages/Dashboard.module.scss';

const Dashboard: React.FC = () => (
  <div className={style.dashboardContainer}>
    <Sidebar />
  </div>
);

export default Dashboard;

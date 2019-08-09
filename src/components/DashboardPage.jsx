import React from 'react';
import DashboardModule from './DashboardModule.jsx';
import SettingsForm from './SettingsForm.jsx';
import CachePieChart from './CachePieChart.jsx';
import PastWords from './PastWords.jsx';

const DashboardPage = () => (
  <div>
    <h2>Dashboard</h2>
    <DashboardModule component={SettingsForm} className={'settings'} />
    <DashboardModule component={PastWords} className={'history'} />
    <DashboardModule component={CachePieChart} className={'device-storage'} />
  </div>
);

export default DashboardPage;

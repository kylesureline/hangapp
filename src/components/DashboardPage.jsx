import React from 'react';
import DashboardModule from './DashboardModule.jsx';
// Modules:
import SettingsForm from './DashboardModules/SettingsForm.jsx';
// import CachePieChart from './DashboardModules/CachePieChart.jsx';
import PastWords from './DashboardModules/PastWords.jsx';
// import Status from './DashboardModules/Status.jsx';

export const DashboardPage = () => (
  <div>
    <h2>Dashboard</h2>
    {/* <DashboardModule component={Status} className={'status'} /> */}
    <DashboardModule component={SettingsForm} className={'settings'} />
    <DashboardModule component={PastWords} className={'history'} />
    {/* <DashboardModule component={CachePieChart} className={'device-storage'} /> */}
  </div>
);

export default DashboardPage;

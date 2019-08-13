import React from 'react';
import DashboardModule from './DashboardModule.jsx';
// Modules:
import SettingsForm from './DashboardModules/SettingsForm.jsx';
import PastWords from './DashboardModules/PastWords.jsx';
import Stats from './DashboardModules/Stats.jsx';

export const DashboardPage = () => (
  <div className="dashboard-page">
    <h2>Dashboard</h2>
    <DashboardModule component={SettingsForm} className={'settings'} />
    <DashboardModule component={Stats} className={'stats'} />
    <DashboardModule component={PastWords} className={'history'} />
  </div>
);

export default DashboardPage;

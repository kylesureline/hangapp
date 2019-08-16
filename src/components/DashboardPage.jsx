import React from 'react';
import DashboardModule from './DashboardModule.jsx';
// Modules:
import SettingsForm from './DashboardModules/SettingsForm.jsx';
import PastWords from './DashboardModules/PastWords.jsx';
import Stats from './DashboardModules/Stats.jsx';

export const DashboardPage = () => (
  <div className="page page--dashboard">
    <h2 className="page__title">Dashboard</h2>
    <DashboardModule component={SettingsForm} className={'settings'} />
    <DashboardModule component={Stats} className={'stats'} />
    <DashboardModule component={PastWords} className={'past-games'} />
  </div>
);

export default DashboardPage;

import React from 'react';
import { connect } from 'react-redux';

export const DashboardModule = ({
  component: Component,
  className
}) => (
  <div className={`module module--${className}`}>
    <Component />
  </div>
);

export default DashboardModule;

import React from 'react';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
}

export default App;
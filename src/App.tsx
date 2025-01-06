import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SubscriptionList } from './components/SubscriptionList';
import { FamilyManagement } from './components/FamilyManagement';
import Login from './components/Login';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-[#0B0F19] relative overflow-hidden">
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] opacity-20">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 blur-[120px]" />
            </div>
            
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] opacity-20">
              <div className="absolute inset-0 rounded-full bg-gradient-to-l from-purple-600/50 to-indigo-600/50 blur-[100px]" />
            </div>
            
            <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] opacity-20">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-600/50 to-purple-600/50 blur-[80px]" />
            </div>
          </div>

          <Navbar />
          
          <main className="relative">
            <Switch>
              <Route exact path="/" component={Hero} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/subscriptions" component={SubscriptionList} />
              <Route path="/family" component={FamilyManagement} />
              <Route path="/login" component={Login} />
            </Switch>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App; 
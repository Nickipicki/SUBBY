import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { DatabaseService } from '../services/database';
import { Subscription } from '../types';

export const SubscriptionList: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      // Hier später: Lade Abos für den aktuellen Benutzer
    }
  }, [currentUser]);

  return (
    <div className="subscription-list">
      <h2>Meine Abonnements</h2>
      
      <div className="subscriptions">
        {subscriptions.map(subscription => (
          <div key={subscription.id} className="subscription-card">
            <h3>{subscription.name}</h3>
            <p>Preis: {subscription.price} €</p>
            <p>Intervall: {subscription.interval}</p>
            <p>Nächste Abbuchung: {new Date(subscription.next_billing_date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}; 
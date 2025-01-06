import React, { useState, useEffect } from 'react';
import { Family } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { DatabaseService } from '../services/database';

export const FamilyManagement: React.FC = () => {
  const [families, setFamilies] = useState<Family[]>([]);
  const [newFamilyName, setNewFamilyName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  // Lade Familien beim Start
  useEffect(() => {
    if (currentUser) {
      loadFamilies();
    }
  }, [currentUser]);

  const loadFamilies = async () => {
    try {
      const loadedFamilies = await DatabaseService.getFamilies(currentUser!.id);
      setFamilies(loadedFamilies);
    } catch (err) {
      setError('Fehler beim Laden der Familien');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createFamily = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFamilyName.trim()) return;

    try {
      await DatabaseService.createFamily(newFamilyName, currentUser!.id);
      setNewFamilyName('');
      loadFamilies(); // Lade die Liste neu
    } catch (err) {
      setError('Fehler beim Erstellen der Familie');
      console.error(err);
    }
  };

  const addMember = async (familyId: string, email: string) => {
    try {
      // Hier müssten wir erst die User-ID für die E-Mail finden
      // Dies ist nur ein Beispiel - in der Praxis brauchen wir eine Suche nach Benutzern
      await DatabaseService.addFamilyMember(familyId, email);
      loadFamilies();
    } catch (err) {
      setError('Fehler beim Hinzufügen des Mitglieds');
      console.error(err);
    }
  };

  if (loading) return <div>Lade...</div>;

  return (
    <div className="family-management">
      <h2>Familien & Gruppen</h2>
      
      {error && <div className="error">{error}</div>}
      
      <div className="create-family">
        <h3>Neue Familie/Gruppe erstellen</h3>
        <form onSubmit={createFamily}>
          <input
            type="text"
            value={newFamilyName}
            onChange={(e) => setNewFamilyName(e.target.value)}
            placeholder="Name der Familie/Gruppe"
          />
          <button type="submit">Erstellen</button>
        </form>
      </div>

      <div className="my-families">
        <h3>Meine Familien/Gruppen</h3>
        {families.map(family => (
          <div key={family.id} className="family-card">
            <h4>{family.name}</h4>
            <p>Erstellt am: {new Date(family.created_at).toLocaleDateString()}</p>
            <p>Mitglieder: {(family.family_members?.length || 0) + 1}</p>
            {family.owner_id === currentUser?.id && (
              <div className="add-member">
                <input
                  type="email"
                  placeholder="E-Mail des neuen Mitglieds"
                  // Hier würde noch die Logik zum Hinzufügen kommen
                />
                <button>Hinzufügen</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 
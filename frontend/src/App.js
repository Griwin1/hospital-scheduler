import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Logo from './assets/hospital-scheduler-logo.svg'; //

const API_BASE = 'http://localhost:3001/api';

function App() {
  const [operatingRooms, setOperatingRooms] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [roomsResponse, staffResponse] = await Promise.all([
        axios.get(`${API_BASE}/operating-rooms`),
        axios.get(`${API_BASE}/staff`)
      ]);
      
      setOperatingRooms(roomsResponse.data);
      setStaff(staffResponse.data);
    } catch (err) {
      console.error('Грешка при зареждане на данните:', err);
      setError('Неуспешно зареждане на данните. Моля, опитайте отново.');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchData();
  };

  // Статистики
  const activeRooms = operatingRooms.filter(room => room.is_active).length;
  const activeStaff = staff.filter(person => person.is_active).length;
  const surgeons = staff.filter(person => person.role === 'Surgeon').length;

  if (loading) {
    return (
      <div className="App">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Зареждане на болнични данни...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div className="error-container">
          <div className="error-icon">❌</div>
          <h2>Грешка при зареждане</h2>
          <p>{error}</p>
          <button onClick={refreshData} className="retry-btn">
            Опитай отново
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Хедър */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
           <img src={Logo} alt="Hospital Scheduler Logo" className="logo-image" />
            <div>
              <h1>Hospital Scheduler</h1>
              <p>Система за управление на болнични ресурси</p>
            </div>
          </div>
          <div className="header-actions">
            <button onClick={refreshData} className="refresh-btn">
              🔄 Обнови данни
            </button>
          </div>
        </div>
      </header>

      {/* Основно съдържание */}
      <main className="main-content">
        {/* Статистики */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">{operatingRooms.length}</span>
            <span className="stat-label">Операционни стаи</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{staff.length}</span>
            <span className="stat-label">Медицински персонал</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{activeRooms}</span>
            <span className="stat-label">Активни стаи</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{surgeons}</span>
            <span className="stat-label">Хирурзи</span>
          </div>
        </div>

        {/* Операционни стаи */}
        <section className="section">
          <div className="section-header">
            <h2> Операционни Стаи <span className="count-badge">{operatingRooms.length}</span></h2>
          </div>
          <div className="cards-grid">
            {operatingRooms.map(room => (
              <div key={room.id} className="card room-card">
                <div className="card-header">
                  <h3 className="card-title">{room.name}</h3>
                  <span className={`status-badge ${room.is_active ? 'active' : 'inactive'}`}>
                    {room.is_active ? '🟢 Активна' : '🔴 Неактивна'}
                  </span>
                </div>
                <p className="card-content">{room.description}</p>
                <div className="card-footer">
                  <div className="meta-info">
                    <span className="meta-item">ID: {room.id}</span>
                    <span className="meta-item">
                      {new Date(room.created_at).toLocaleDateString('bg-BG')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Медицински персонал */}
        <section className="section">
          <div className="section-header">
            <h2>Медицински Персонал <span className="count-badge">{staff.length}</span></h2>
          </div>
          <div className="cards-grid">
            {staff.map(person => (
              <div key={person.id} className="card staff-card">
                <div className="card-header">
                  <h3 className="card-title">{person.first_name} {person.last_name}</h3>
                  <span className={`status-badge ${person.is_active ? 'active' : 'inactive'}`}>
                    {person.is_active ? '🟢 Активен' : '🔴 Неактивен'}
                  </span>
                </div>
                <div className="staff-details">
                  <div className="detail-item">
                    <span className="detail-label">Длъжност:</span>
                    <span className="detail-value">{person.role}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Специалност:</span>
                    <span className="specialization-tag">
                      {person.specialization || 'Обща'}
                    </span>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="meta-info">
                    <span className="meta-item">ID: {person.id}</span>
                    <span className="meta-item">
                      От: {new Date(person.created_at).toLocaleDateString('bg-BG')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Футър */}
      <footer className="app-footer">
        <div className="footer-content">
          <p> Болнична система v2.0 • Професионален дизайн • {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
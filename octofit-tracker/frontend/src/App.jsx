import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Overview', to: '/' },
  { label: 'Activities', to: '/activities' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Teams', to: '/teams' },
  { label: 'Users', to: '/users' },
  { label: 'Workouts', to: '/workouts' },
]

function Overview() {
  return (
    <div className="welcome-panel">
      <p className="eyebrow">Mergington High School</p>
      <h1>OctoFit Tracker</h1>
      <p className="lead">A clear view of activity, teams, progress, and the next workout.</p>
      <div className="row g-3 mt-4">
        {navigation.slice(1, 5).map(({ label, to }) => (
          <div className="col-sm-6 col-xl-3" key={to}>
            <NavLink className="overview-link" to={to}>{label}<span aria-hidden="true">-&gt;</span></NavLink>
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="app-header">
          <NavLink className="brand" to="/">OctoFit <span>Tracker</span></NavLink>
          <nav className="main-nav" aria-label="Primary navigation">
            {navigation.map(({ label, to }) => (
              <NavLink key={to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={to} end={to === '/'}>
                {label}
              </NavLink>
            ))}
          </nav>
        </header>
        <main className="container-fluid app-content">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Overview />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

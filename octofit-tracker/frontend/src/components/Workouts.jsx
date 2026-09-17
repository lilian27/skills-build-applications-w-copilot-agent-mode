import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataState, PageHeading } from './shared.jsx'
import { displayName } from './utils.js'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('workouts', workoutsEndpoint).then(setWorkouts).then(() => setStatus('ready')).catch((requestError) => { setError(requestError.message); setStatus('error') }) }, [])
  return <section><PageHeading title="Workouts" description="Personalized suggestions for the next session." /><DataState status={status} error={error} empty={!workouts.length} /><div className="row g-3">{status === 'ready' && workouts.map((workout) => <div className="col-md-6 col-xl-4" key={workout._id}><article className="info-card"><span className="badge text-bg-warning text-uppercase">{workout.difficulty}</span><h2>{workout.name}</h2><p>{workout.description}</p><p className="small mb-0">Recommended for {displayName(workout.recommendedFor)}</p></article></div>)}</div></section>
}

export default Workouts
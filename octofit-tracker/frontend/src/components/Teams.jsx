import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataState, PageHeading } from './shared.jsx'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('teams', teamsEndpoint).then(setTeams).then(() => setStatus('ready')).catch((requestError) => { setError(requestError.message); setStatus('error') }) }, [])
  return <section><PageHeading title="Teams" description="Find your crew and keep the momentum moving." /><DataState status={status} error={error} empty={!teams.length} /><div className="row g-3">{status === 'ready' && teams.map((team) => <div className="col-md-6 col-xl-4" key={team._id}><article className="info-card"><p className="eyebrow">{team.members?.length ?? 0} members</p><h2>{team.name}</h2><p>{team.description}</p><strong>{team.totalPoints ?? 0} points</strong></article></div>)}</div></section>
}

export default Teams
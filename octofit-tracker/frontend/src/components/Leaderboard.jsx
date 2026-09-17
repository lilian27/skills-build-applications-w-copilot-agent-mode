import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataState, PageHeading } from './shared.jsx'
import { displayName } from './utils.js'

function Leaderboard() {
  const [rows, setRows] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('leaderboard').then(setRows).then(() => setStatus('ready')).catch((requestError) => { setError(requestError.message); setStatus('error') }) }, [])
  return <section><PageHeading title="Leaderboard" description="Friendly competition, measured by consistent effort." /><DataState status={status} error={error} empty={!rows.length} />{status === 'ready' && rows.length > 0 && <div className="leaderboard-list">{rows.map((row, index) => <article className="leaderboard-row" key={row._id}><span className="rank">{row.rank ?? index + 1}</span><div><h2>{displayName(row.user)}</h2><p>{row.team?.name ?? 'Independent'} · {row.activitiesCompleted ?? 0} activities</p></div><strong>{row.points} pts</strong></article>)}</div>}</section>
}

export default Leaderboard
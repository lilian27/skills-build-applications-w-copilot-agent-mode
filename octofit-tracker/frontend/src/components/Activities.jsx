import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataState, PageHeading } from './shared.jsx'
import { displayName, formatDate } from './utils.js'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities', activitiesEndpoint).then(setActivities).then(() => setStatus('ready')).catch((requestError) => {
      setError(requestError.message)
      setStatus('error')
    })
  }, [])

  return <section><PageHeading title="Activities" description="Recent movement logged by the OctoFit community." />
    <DataState status={status} error={error} empty={!activities.length} />
    {status === 'ready' && activities.length > 0 && <div className="table-responsive"><table className="table align-middle"><thead><tr><th>Activity</th><th>Athlete</th><th>Duration</th><th>Points</th><th>Completed</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id}><td className="fw-semibold text-capitalize">{activity.type}</td><td>{displayName(activity.user)}</td><td>{activity.durationMinutes} min</td><td>{activity.points}</td><td>{formatDate(activity.completedAt)}</td></tr>)}</tbody></table></div>}
  </section>
}

export default Activities
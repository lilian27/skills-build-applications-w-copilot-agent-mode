import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataState, PageHeading } from './shared.jsx'
import { displayName } from './utils.js'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('users', usersEndpoint).then(setUsers).then(() => setStatus('ready')).catch((requestError) => { setError(requestError.message); setStatus('error') }) }, [])
  return <section><PageHeading title="Users" description="The students and staff making progress together." /><DataState status={status} error={error} empty={!users.length} />{status === 'ready' && users.length > 0 && <div className="table-responsive"><table className="table align-middle"><thead><tr><th>Name</th><th>Username</th><th>Email</th><th>Joined</th></tr></thead><tbody>{users.map((user) => <tr key={user._id}><td className="fw-semibold">{displayName(user)}</td><td>@{user.username}</td><td>{user.email}</td><td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</td></tr>)}</tbody></table></div>}</section>
}

export default Users
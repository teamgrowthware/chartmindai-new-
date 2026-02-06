import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore'
import { db } from '../config/firebase'
import { FiSearch, FiDownload, FiCheck, FiX, FiRefreshCw } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

export default function Admin() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, active, inactive

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    filterUsers()
  }, [searchTerm, filter, users])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const usersRef = collection(db, 'users')
      const q = query(usersRef, orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      
      const usersData = []
      querySnapshot.forEach((doc) => {
        usersData.push({
          id: doc.id,
          ...doc.data()
        })
      })
      
      setUsers(usersData)
      setFilteredUsers(usersData)
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const filterUsers = () => {
    let filtered = users

    // Filter by status
    if (filter === 'active') {
      filtered = filtered.filter(user => {
        if (user.subscriptionStatus === 'active' && user.subscriptionEndDate) {
          return new Date(user.subscriptionEndDate) > new Date()
        }
        return false
      })
    } else if (filter === 'inactive') {
      filtered = filtered.filter(user => {
        if (user.subscriptionStatus === 'active' && user.subscriptionEndDate) {
          return new Date(user.subscriptionEndDate) <= new Date()
        }
        return user.subscriptionStatus !== 'active'
      })
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredUsers(filtered)
  }

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const userRef = doc(db, 'users', userId)
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
      
      await updateDoc(userRef, {
        subscriptionStatus: newStatus,
        updatedAt: new Date().toISOString()
      })

      toast.success(`User ${newStatus === 'active' ? 'activated' : 'deactivated'}`)
      fetchUsers()
    } catch (error) {
      console.error('Error updating user:', error)
      toast.error('Failed to update user status')
    }
  }

  const exportToCSV = () => {
    const headers = ['Email', 'User ID', 'Status', 'Plan', 'Created At', 'Subscription End']
    const rows = filteredUsers.map(user => [
      user.email || 'N/A',
      user.id,
      user.subscriptionStatus || 'inactive',
      user.subscriptionPlan || 'N/A',
      user.createdAt ? format(new Date(user.createdAt), 'yyyy-MM-dd') : 'N/A',
      user.subscriptionEndDate ? format(new Date(user.subscriptionEndDate), 'yyyy-MM-dd') : 'N/A'
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tradorr-users-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
    window.URL.revokeObjectURL(url)

    toast.success('CSV exported successfully')
  }

  const getStatusBadge = (user) => {
    if (user.subscriptionStatus === 'active' && user.subscriptionEndDate) {
      const isActive = new Date(user.subscriptionEndDate) > new Date()
      return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {isActive ? 'Active' : 'Expired'}
        </span>
      )
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-500/20 text-gray-400">
        Inactive
      </span>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-gray-400">Manage users and subscriptions</p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-xl p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by email or user ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex gap-2 glass-effect rounded-lg p-1">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    filter === 'all'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                      : 'hover:bg-white/5'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    filter === 'active'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                      : 'hover:bg-white/5'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter('inactive')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    filter === 'inactive'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                      : 'hover:bg-white/5'
                  }`}
                >
                  Inactive
                </button>
              </div>

              <button
                onClick={fetchUsers}
                className="p-2 glass-effect rounded-lg hover:bg-white/10 transition-all"
                title="Refresh"
              >
                <FiRefreshCw className={loading ? 'animate-spin' : ''} />
              </button>

              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center space-x-2"
              >
                <FiDownload />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-xl overflow-hidden"
        >
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-400">Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-400">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Plan</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Created</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium">{user.email || 'N/A'}</div>
                        <div className="text-xs text-gray-500 font-mono">{user.id.substring(0, 20)}...</div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(user)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">{user.subscriptionPlan || 'N/A'}</div>
                        {user.subscriptionEndDate && (
                          <div className="text-xs text-gray-500">
                            Until {format(new Date(user.subscriptionEndDate), 'MMM dd, yyyy')}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {user.createdAt ? format(new Date(user.createdAt), 'MMM dd, yyyy') : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleUserStatus(user.id, user.subscriptionStatus)}
                          className={`p-2 rounded-lg transition-all ${
                            user.subscriptionStatus === 'active'
                              ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                              : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          }`}
                          title={user.subscriptionStatus === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          {user.subscriptionStatus === 'active' ? <FiX /> : <FiCheck />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6 mt-6"
        >
          <div className="glass-effect rounded-xl p-6">
            <div className="text-3xl font-bold mb-2">{users.length}</div>
            <div className="text-gray-400">Total Users</div>
          </div>
          <div className="glass-effect rounded-xl p-6">
            <div className="text-3xl font-bold mb-2">
              {users.filter(u => u.subscriptionStatus === 'active' && u.subscriptionEndDate && new Date(u.subscriptionEndDate) > new Date()).length}
            </div>
            <div className="text-gray-400">Active Subscriptions</div>
          </div>
          <div className="glass-effect rounded-xl p-6">
            <div className="text-3xl font-bold mb-2">
              {users.filter(u => u.subscriptionStatus !== 'active' || !u.subscriptionEndDate || new Date(u.subscriptionEndDate) <= new Date()).length}
            </div>
            <div className="text-gray-400">Inactive Users</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../../components/Admin/AdminSidebar' // if you have one

const AdminLayout = () => {
  return (
    <div className='flex min-h-screen'>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className='flex-1 p-4'>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout

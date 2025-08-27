import React from 'react'
import OrgList from './OrgList'
import Featured from './Featured'

function Sidebar() {
  return (
    <div className='absolute left-0 top-0 z-10 flex'>
        <OrgList />
        <Featured />
    </div>
  )
}

export default Sidebar
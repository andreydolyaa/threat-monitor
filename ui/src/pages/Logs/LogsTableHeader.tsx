import React from 'react'

const LogsTableHeader = () => {
  return (
    <div className='logs-table-header'>
      <div>ID</div>
      <div>Alert Rule</div>
      <div>Severity</div>
      <div>Source</div>
      <div>Agent Name</div>
      <div>Endpoint IP</div>
    </div>
  )
}

export default LogsTableHeader
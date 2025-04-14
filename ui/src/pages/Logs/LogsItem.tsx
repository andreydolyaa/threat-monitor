import React from 'react'
import { Log } from '../../types'

type LogProps = {
  log: Log
}

const LogsItem = ({ log }: LogProps) => {
  return (
    <div>
      <div className='log-item'>{log.logId}</div>
      <div className='log-item'>{log.data.processed.summary}</div>
      <div className='log-item'>{log.data.processed.severity}</div>
      <div className='log-item'>{log.source}</div>
      <div className='log-item'>{log.agentName}</div>
      <div className='log-item'>{log.endpointIp}</div>

    </div>
  )
}

export default LogsItem
import React, { Suspense } from 'react'
import './app.less'
import { add } from './untils/math'

function App() {
  return <div className='app'>{add(5, 6)}</div>
}

export default App

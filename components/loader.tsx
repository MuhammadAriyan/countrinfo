import { waveform } from 'ldrs'
import 'ldrs/ring'
import React from 'react'

const Loader = () => {
waveform.register()
  return (
    <>
<l-waveform
  size="35"
  stroke="3.5"
  speed="1" 
  color="black" 
></l-waveform>
    </>
  )
}

export default Loader
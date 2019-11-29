import React, { useState, useCallback, useEffect } from 'react'
import { auth } from '../../../helpers'
interface Props {}

const Component: React.FC<Props> = () => {
  const [phone, setPhone] = useState('')

  const handlePhone = useCallback(e => {
    setPhone(e.target.value)
  })

  const nextStage = useCallback(
    async e => {
      e.preventDefault()

      const result = await auth.setPhone(phone)
      console.log(result)
      if (result) {
        console.log('next')
      }
    },
    [phone],
  )

  return (
    <div>
      <input type="text" value={phone} onChange={handlePhone} />
      <button onClick={nextStage}>Next</button>
    </div>
  )
}

export default Component

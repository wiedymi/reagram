import React, { ReactNode } from 'react'
import { Layout } from '@/components/base'
import LeftMenu from '@/components/LeftMenu'
import { Wrapper } from './styles'

const Main = (): ReactNode => {
  return (
    <Layout>
      <Wrapper>
        <LeftMenu />
      </Wrapper>
    </Layout>
  )
}

Main.defaultProps = {
  // bla: 'test',
}

export default Main

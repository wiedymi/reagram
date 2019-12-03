import React, { ReactNode } from 'react'
import { Layout } from '@/components/base'
import LeftMenu from '@/components/LeftMenu'
import { Wrapper } from './styles'

type Props = {
  children: ReactNode
}

const Main = (props: Props) => {
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

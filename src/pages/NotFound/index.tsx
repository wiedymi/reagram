import React from 'react'

type INotFound = {
  children: ReactNode;
}

function NotFound(props: INotFound): ReactNode {
  return <div>Not found, sorry</div>
}

export default NotFound

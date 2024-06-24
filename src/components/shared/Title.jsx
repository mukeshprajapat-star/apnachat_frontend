import React from 'react'
import {Helmet} from 'react-helmet-async'
const Title = ({title="Apna Chat",description="this is chat app called apna chat" }) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
    </Helmet>
  )
}

export default Title
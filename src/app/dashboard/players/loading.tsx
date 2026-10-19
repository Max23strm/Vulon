import { Container, Skeleton } from '@mantine/core'
import React from 'react'

const Loading = () => {
  return (
    <Container>
      <Skeleton height={32} width={'100%'} radius="xl" />
      <Skeleton height={250} radius="lg" mt={16} />
    </Container>
  )
}

export default Loading
import styled from "@emotion/styled"

const Container = styled.div`
  margin: 1em;
  max-width: 32em; ;
`
const Title = styled.h1``

export default function () {
  return (
    <Container className="card card-body">
      <Title>Hello World</Title>
    </Container>
  )
}

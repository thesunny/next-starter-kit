import styled from "@emotion/styled"
import { addOne } from "~/lib/example"

const Container = styled.div`
  margin: 1em;
  max-width: 32em;
`
const Title = styled.h1``

export default function () {
  return (
    <Container className="card card-body">
      <Title>Hello World</Title>
      <p>Luck number {addOne(6)}</p>
    </Container>
  )
}

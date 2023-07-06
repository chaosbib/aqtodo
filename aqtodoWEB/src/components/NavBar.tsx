import { Navbar, Container } from 'react-bootstrap';

const NavBar = (): JSX.Element => {
  return (
    <Navbar  variant="dark" style={{backgroundColor:'#47a23f'}}>
      <Container>
        <Navbar.Brand>
          <img
            src={"../logo192.png"}
            alt={"AQ Todo List"}
            height="25"
            className={"me-3"}
            style={{float: "left"}}
          />
          AQ Todo List
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default NavBar;
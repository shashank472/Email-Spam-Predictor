import {Container, Navbar} from "react-bootstrap"

function Header() {
    return (
      <>
        <Navbar bg="dark" variant="dark" id="mynav">
          <Container>
            <Navbar.Brand href="#home" id="mytext">Email Span Predictor</Navbar.Brand>
          </Container>
        </Navbar>
      </>
    );
  }
  
  export default Header;
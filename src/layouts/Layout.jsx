import { Outlet } from "react-router-dom"
import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import Container from "../components/container/Container"
import FooterNav from "../components/footerNav/FooterNav"

function Layout() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <FooterNav />
      <Footer />
    </>
  )
}

export default Layout
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {




  return (
    <>
    
      <div className="app">
      <Navbar/>

      <main className="pages">
        <Outlet/>
      </main>

      <Footer/>
    </div>
    
    </>
  )
}

export default AppLayout

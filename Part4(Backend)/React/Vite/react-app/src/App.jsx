import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Card from "./components/Card"
function App() {
  return (
    <>
      <Navbar/>
      <div className="cards">
        <Card title = 'Card1' description = 'Card1 Desc'/>
        <Card title = 'Card2' description = 'Card2 Desc'/>
        <Card title = 'Card3' description = 'Card3 Desc'/>
      </div>
      <Footer/>
    </>
  )
}

export default App

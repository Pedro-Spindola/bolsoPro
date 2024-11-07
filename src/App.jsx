import './App.css'
import { Outlet } from "react-router-dom"
import NavBar from "./components/Navbar"
function App() {
  return (
    <div className="App">
        <NavBar/>
        <main className={"main"}>
          <Outlet/>
        </main>
    </div>
  )
}

export default App

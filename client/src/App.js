import './App.css'
import { BookingForm } from "./BookingForm.js"

function App() {
    return (
        <>
            <div className='background'>
                <h1>Tennis Booking App</h1>
                <div>
                    <a href="" target="_blank">
                        <img src="https://static.vecteezy.com/system/resources/previews/027/504/381/original/a-tennis-ball-on-a-transparent-background-free-png.png" className="logo" alt="Vite logo" />
                    </a>
                </div>
                <BookingForm />
            </div>
        </>
    )
}

export default App


import "../styles/admin.css";

import { useState} from "react";

function ConfigCourts() {
  const [court, setCourt] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const courtData = { court, price, size };
        console.log(courtData);
        try {
            // Send the data to the server
        } catch (error) {
            console.error("Error submitting booking: ", error);
        }
    }

  return (
    <div>
        <h1>Configure Courts</h1>
        <div className="admin-subtitle">Select Court</div>
        <form>
        <div >
              <select className="inputBox" onChange={(e) => setCourt(e.target.value)}>
                <option value="">Select a court</option>
                <option value="court1">Court 1</option>
                <option value="court2">Court 2</option>
              </select>
            </div>
        <div className="admin-subtitle">Edit details</div>
        <input type="text" className="inputBox" placeholder="Court size" onChange={(e) => setSize(e.target.value)}/>
        <br></br>
        <br></br>
        <input type="number" className="inputBox" placeholder="€Price" onChange={(e) => setPrice(e.target.value)}/>
        <br></br>
        <br></br>
            <button type="submit" className="booking-button" onClick={handleSubmit}>
                Save
            </button>
        </form>
    </div>
  );
}

export default ConfigCourts;

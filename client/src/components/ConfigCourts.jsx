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
            const response = await fetch("/api/configCourts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(courtData),
            });
            console.log(response);
        } catch (error) {
            console.error("Error submitting booking: ", error);
        }
    }

  return (
    <main className="profile">
    <div>
        <h1>Configure Courts</h1>
        <h4>Select Court</h4>
        <form>
        <div >
              <select className="inputBox" onChange={(e) => setCourt(e.target.value)}>
                <option value="">Select a court</option>
                <option value="court1">Court 1</option>
                <option value="court2">Court 2</option>
                <option value="court3">Court 3</option>
              </select>
            </div>
        <h4>Edit details</h4>
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
    </main>
  );
}

export default ConfigCourts;

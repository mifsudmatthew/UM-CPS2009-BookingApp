import { useState} from "react";
import { ToastContainer, toast } from "react-toastify";

function AddNewCourt() {
    const [courtName, setCourtName] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const courtData = { courtName, price, size };
        try {
            const response = await fetch("/api/configCourts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(courtData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log("Success: ", response);
            toast.success("Court added successfully.");
            window.location.reload();
        } catch (error) {
            toast.error("Error adding court. Please try again.");
            console.error("Error: ", error);
        }
    }

    return (
        <div className={"mainContainer"}r>
            <ToastContainer />
            <h1>Add New Court</h1>
            <form>
            <div className={"inputContainer"}>
                <label>Enter the name of the court</label>
                <input type="text" className="inputBox" placeholder="Court Name" onChange={(e) => setCourtName(e.target.value)}/>
            </div>
            <br></br>
            <div className={"inputContainer"}>
                <label>Enter the size of the court</label>
                <input type="text" className="inputBox" placeholder="Court size" onChange={(e) => setSize(e.target.value)}/>
            </div>
            <br></br>
            <div className={"inputContainer"}>
                <label>Enter the price of the court</label>
                <input type="number" className="inputBox" placeholder="€Price" onChange={(e) => setPrice(e.target.value)}/>
            </div>
            <br></br>
            <br></br>
                <button type="submit" className="booking-button" onClick={handleSubmit}>
                    Add Court
                </button>
            </form>
        </div>
    );

}

export default AddNewCourt;
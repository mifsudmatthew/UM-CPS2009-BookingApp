import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { Post } from "../../utils/ApiFunctions";

import Form from "../form/Form";
import InputBox from "../form/InputBox";
import InputButton from "../form/InputButton";

/**
 * Renders a form to add a new court.
 *
 * @returns {JSX.Element} The AddNewCourt component.
 */
function AddNewCourt() {
    // State variables to store the court name, price, and size
    const [courtName, setCourtName] = useState("");
    const [price, setPrice] = useState("");
    const [address, setAddress] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [area, setArea] = useState("");
    const [type, setType] = useState("");

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const courtData = {
                courtName,
                price,
                address,
                longitude,
                latitude,
                area,
                type,
            };
            const response = await Post("/api/registerCourt", courtData);
            if (response.result == true) {
                toast.success("Court added successfully.");
                console.log("Success: ", response);
            }
            window.location.reload();
        } catch (error) {
            // Display an error toast message
            toast.error("Error adding court. Please try again.");
            console.error("Error: ", error);
        }
    };

    return (
        <main className="profile">
            <ToastContainer />
            <div className="header-title">Add New Court</div>
            <Form>
                <InputBox
                    id="NewCourtsCourtName"
                    label="Enter the name of the court"
                    placeholder="Court Name"
                    onChange={(event) => setCourtName(event.target.value)}
                />
                <br />
                <InputBox
                    id="NewCourtsCourtArea"
                    label="Enter the area of the court"
                    placeholder="Court Area"
                    onChange={(event) => setArea(event.target.value)}
                />
                <br />
                <InputBox
                    id="NewCourtsCourtPrice"
                    label="Enter the price of the court"
                    type="number"
                    placeholder="€Price"
                    onChange={(event) => setPrice(event.target.value)}
                />
                <br />
                <select className="inputBox" 
                    id="NewCourtsCourtType"
                    onChange={(event) => setType(event.target.value)}>
                    <option value="">Select Court Type</option>
                    <option value="Hard Court">Hard Court</option>
                    <option value="Clay Court">Clay Court</option>
                    <option value="Grass Court">Grass Court</option>
                    <option value="Carpet Court">Carpet Court</option>
                </select>
                <br />
                <InputBox
                    id="NewCourtsCourtAddress"
                    label="Enter the address of the court"
                    type="number"
                    placeholder="Address"
                    onChange={(event) => setAddress(event.target.value)}
                />
                <br />
                <InputBox
                    id="NewCourtsCourtLongitude"
                    label="Enter the longitude of the court"
                    type="number"
                    placeholder="Longitude"
                    onChange={(event) => setLongitude(event.target.value)}
                />
                <br />
                <InputBox
                    id="NewCourtsCourtLatitude"
                    label="Enter the latitude of the court"
                    type="number"
                    placeholder="Latitude"
                    onChange={(event) => setLatitude(event.target.value)}
                />
                <br />
                <InputButton
                    className="booking-button"
                    type="submit"
                    label="Add Court"
                    onClick={handleSubmit}
                />
            </Form>
        </main>
    );
}

export default AddNewCourt;

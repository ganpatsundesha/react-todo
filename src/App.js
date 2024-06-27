import React, { useState } from "react";
import './App.css'

const App = () => {
    const [formValue, setFormValue] = useState({
        name: "",
        email: "",
        discription: "",
    });
    const [formError, setFormError] = useState("")


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValue((prev) => ({ ...prev, [name]: value }));
    };


    const formSubmit = (event) => {
        event.preventDefault();
        if (formValue.name === "" || formValue.email === "" || formValue.discription === "") {
            setFormError("Something is missing")
        }
        else {
            setFormError("")
        }
    };

    return (
        <div className="sectionForm">
            <div className="container">
                <form onSubmit={formSubmit}>
                    {formError && <p>{formError}</p>}
                    <input type="text" placeholder="Name" value={formValue.name || ""} name="name" onChange={handleChange} />
                    <input type="email" placeholder="Email" required value={formValue.email || ""} name="email" onChange={handleChange} />
                    <input type="text" placeholder="Discription" value={formValue.discription || ""} name="discription" onChange={handleChange} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
};

export default App;

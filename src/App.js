import React, { useState, useEffect } from "react";
import './App.css'

const App = () => {

    const localdata = localStorage.getItem("todos")
    const todoData = JSON.parse(localdata) || []

    const [formValue, setFormValue] = useState({
        name: "",
        email: "",
        discription: "",
    });
    const [formError, setFormError] = useState("");
    const [todos, setTodos] = useState([])

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
            setTodos((prev) => ([...prev, formValue]))
        }
    };

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    useEffect(() => {
        setTodos(todoData)
    }, [window])

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
                <div className="d-flex">
                    {
                        todos.length > 0 && todos.map((elem, index) => {
                            const { name, email, discription } = elem
                            return (
                                <div className="todoCard" key={index}>
                                    <div>{name}</div>
                                    <div>{email}</div>
                                    <div>{discription}</div>
                                    
                                </div>
                            )
                        })
                    }
                    {
                        todos.length <= 0 && todos === null && <h1>No Found</h1>
                    }
                </div>
            </div>
        </div>
    );
};

export default App;
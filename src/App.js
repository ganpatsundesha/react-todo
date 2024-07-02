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
    const [editedId, setEditedId] = useState(null)
    const [isEdited, setIsEdited] = useState(false)
    const [searchItem, setSearchItem] = useState('')
    const [filteredUsers, setFilteredUsers] = useState()

    const time = new Date()
    const fullTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}-${time.getDate().toString().padStart(2, '0')}/${(time.getMonth() + 1).toString().padStart(2, '0')}/${time.getFullYear()}`

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
        else if (isEdited) {
            setTodos(
                todos.map((curItem) => {
                    if (curItem.id === editedId) {
                        setIsEdited(false)
                        setEditedId(null)
                        setFormValue("")
                        return { ...curItem, name: formValue.name, email: formValue.email, discription: formValue.discription, time: fullTime, edit: true };
                    }
                    else {
                        return curItem;
                    }
                })
            )
        }
        else {
            setFormError("")
            setTodos((prev) => ([...prev, { ...formValue, id: Date.now(), time: fullTime, edit: false }]))
            setFormValue("")
        }
    };

    const editTask = (id) => () => {
        const editData = todos.find((curItem) => {
            return curItem.id === id
        })
        setFormValue(editData)
        setIsEdited(true)
        setEditedId(id)

    }

    const deleteTask = (id) => () => {
        const newTodos = todos.filter((curElem) => {
            return curElem.id !== id
        })
        setTodos(newTodos);
    }

    const pinTask = (elem) => () => {
        const pinItem = todos.filter((curItem) => curItem.id !== elem.id)
        pinItem.unshift({ ...elem, pin: true })
        setTodos(pinItem)

        if (elem.pin === true) {
            const unpinItem = todos.filter((curItem) => curItem.id !== elem.id)
            unpinItem.push({ ...elem, pin: false })
            setTodos(unpinItem)
        }
    }

    const handleSearch = (e) => {
        const searchName = e.target.value
        setSearchItem(searchName)

        const filterdItem = todos.filter((filItem) => {
            return filItem.name.toLowerCase().includes(searchName.toLowerCase())
        })
        setFilteredUsers(filterdItem)
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
        setFilteredUsers(todos)
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
                {
                    todos.length > 1 ? <input type="text" placeholder="Search by Title" value={searchItem || ""} onChange={handleSearch} className="searchBox" /> : ""
                }
                <div className="d-flex">
                    {
                        filteredUsers?.length > 0 ? filteredUsers.map((elem, index) => {
                            const { name, email, discription, id, time, edit, pin } = elem
                            return (
                                <div className="todoCard" key={index}>
                                    {edit && <span>{edit ? "Edited" : ""}</span>}
                                    <div>{name}</div>
                                    <div>{email}</div>
                                    <div>{discription}</div>
                                    <div>{time} <span>{edit && "(Last Edited Time)"}</span></div>
                                    {pin && <div className="pin">Pin</div>}
                                    <div className="d-flex">
                                        <button onClick={editTask(id)}>Edit</button>
                                        <button onClick={deleteTask(id)}>Delete</button>
                                        <button onClick={pinTask(elem)}>{pin ? "Unpin" : "Pin"}</button>
                                    </div>
                                </div>
                            )
                        }) : <>
                            {
                                todos.length > 0 ? <h3>Result Not Found</h3> : <h3>Please Add Your Tasks</h3>
                            }
                        </>

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
import React, { useContext, useRef, useState } from "react"
import { ApartmentContext } from "./ApartmentProvider"
import { UserContext } from "../user/UserProvider"
import axios from 'axios'

export default props => {
    const { addApartment } = useContext(ApartmentContext)    
    const { users } = useContext(UserContext)
    const [apartmentImage, setApartmentImage] = useState('')
    const [loading, setLoading] = useState(false)
    const upload_Image = e => {
        const files = e.target.files[0]
        const formData = new FormData()
        formData.append("upload_preset", "bugtracker1")
        formData.append("file", files)
        setLoading(true)
        axios.post("https://api.cloudinary.com/v1_1/dgmlysx6a", formData)
        .then(res => setApartmentImage(res.data.secure_url))
        .then(setLoading(false))
        .catch(err=>console.error("error", err))

    }
    const apartmentName = useRef()
    const city = useRef()
    const state = useRef()
    const description = useRef()
    const userId = localStorage.getItem('reviewApartment_user')
    const user = users.find(u => u.id === parseInt(userId))
    const addNewApartment = () => {
        if (userId) {
            addApartment({
                userId:parseInt(userId),
                uploadImage: setApartmentImage,
                apartmentName: apartmentName.current.value,
                city: city.current.value,
                state: state.current.value,
                description: description.current.value,
            })
            .then(props.showAllApartments)
        }
    }

    return (
        <form className="apartmentForm">
            <h5 className="Create_new_apartment">Create New Apartment</h5>
            <fieldset>
                <div className="form-group">
                    <input type = "file" name = "file" onChange = {upload_Image} />
                    {loading ? "Loading": <img className = "uploadImage" src = {apartmentImage} />}
                    
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="apartmentName">Apartment name: </label>
                    <input
                        type="text"
                        id="apartmentName"
                        ref={apartmentName}
                        className="form-control"
                        placeholder="Apartment name"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="city">City: </label>
                    <input
                        type="text"
                        id="city"
                        ref={city}
                        required
                        className="form-control"
                        placeholder="city"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="state">State: </label>
                    <input
                        type="text"
                        id="state"
                        ref={state}
                        className="form-control"
                        placeholder="State"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input
                        type="text"
                        id="description"
                        ref={description}
                        className="form-control"
                        placeholder="Description"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="userName">By: </label>
                    <select
                        defaultValue=""
                        name="userId"
                        id="userId"
                        className="form-control">
                        <option value="0">
                        {
                            user.userName
                        }
                        </option>
                        
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={
                    evt => {
                        evt.preventDefault() // Prevent browser from submitting the form
                        addNewApartment()
                    }
                }
                className="btn btn-primary">
                Create 
            </button>
        </form>
    )
}
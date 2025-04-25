import axios from 'axios';
import React, { useState } from 'react';
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;


const DoorCard = ({door,getDoors}) => {
    const [isEditmode,setisEditMode] = useState(false);
    const [doorForm,setDoorForm] = useState({
        name:door.name,
        status:door.status
    })

    async function deleteDoor() {
        try {
            await axios.delete(`${API_URI}/${door.id}`);
            alert("Item deleted successfully");
            getDoors();
        } catch (error) {
            console.log(error);
            alert("Something went wrong while deleting door");
        }
    }

    function handleInput(event){
        const key = event.target.name;
        const value = event.target.value;
        setDoorForm({...doorForm,[key]:value});
    }

    async function handleForm(e) {
        e.preventDefault();
        try {
            const {name,status} = doorForm;
            if(!name || !status){
                alert("Please enter all details");
                return;
            }
            await axios.put(`${API_URI}/${door.id}`,doorForm);
            alert("Data updated successfully");
            setisEditMode(false);
            getDoors();
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    }



  return (
    <>
    {
        !isEditmode?
        <div>
      <h3>Name : {door.name}</h3>
      <p>Status : {door.status}</p>
      <div
      style={{
        display:"flex",
        justifyContent:"space-between"
      }}
      >
        <button onClick={
        ()=>setisEditMode(true)
        }>Edit</button>
        <button onClick={deleteDoor}>Delete</button>
      </div>
    </div>
    :<div>
        <form action="" onSubmit={handleForm}>
            <input type="text" value={doorForm.name} name="name" placeholder="Enter Door Name..." onChange={handleInput}/>
            <input type="text" value={doorForm.status} name="status" placeholder="Enter Status..." onChange={handleInput}/>
            <input type="submit" />
        </form>
    <button onClick={
        ()=>setisEditMode(false)
    }>Close Edit Mode</button>
    </div>
    }
    </>
    
  )
}

export default DoorCard
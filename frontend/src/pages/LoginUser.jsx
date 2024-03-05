import axios from "axios";
import {useState} from "react";

export default function LoginUser(){
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [postResponse, setPostResponse] = useState("")

    const handleOnChange = (evt) => {
        const {name, value} = evt.target
        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: value,

            }
        })
    }

    const postUser = async (evt) => {
        evt.preventDefault();
        await axios
        .post("http://localhost:5173/login", formData)
        .then((response) => setPostResponse(<p>{response.data}</p>))
        .then(
            setFormData({
                username:"",
                password:"",
            })
        )
    }
    return(
        <div>
            <div className="Rounded">
                <h1>Log In </h1>
                <form action="" onSubmit={postUser}> 
                    <h3 htmlFor="username">Username: </h3>
                    <input type="text" name="username" id="username" onChange={handleOnChange} value={formData.username} required/>
                    <br />
                    <h3 htmlFor="password">Password: </h3>
                    <input type="password" name="password" id="password" onChange={handleOnChange} value={formData.password} required/>
                    <br /> <br />
                    <button>Log in</button>
                </form>

                <p>not a member yet? click <a href="http://localhost:5173/register"> here </a> to join</p>

                {postResponse}
            </div>
        </div>
    )
}
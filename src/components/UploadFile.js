import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";


function UploadFile() {
    const reload = true;

    const presset_key = "insdataupload"
    const cloud_name = "insdata"
    const [image, setImage] = useState();
    // const [dataPost, setDataPost] = useState({})
    const [data, setData] = useState({})
    

    useEffect(() => {
        const fectApi = async () => {
            const respone = await fetch("http://localhost:3000/posts")
            const result = await respone.json();
            setData(result);
        };
        fectApi();
    }, [])

    console.log(data)

    const handleFile = (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", presset_key)
        axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            // .then(res => console.log(res.data.secure_url))
            .then(res => setImage(res.data.secure_url))
            .catch(err => console.log(err))
    }


    // const handleChange = (e) => {
    //     setDataPost({
    //         ...dataPost,
    //         id: data.length + 2,
    //         userId: 100,
    //         title: "Post n",
    //         body: e.target.title.value,
    //         image: image,
    //         comment: 0,
    //         share: 0,
    //         like: 0,
    //         postTime: "2020-01-01T00:00:00.000Z"
    //     })
    //     console.log("handleChange")
    //     console.log(dataPost)
    // }

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // const res = await fetch("http://localhost:3000/posts", {
        //     method: "POST",
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // })
        // console.log("ham submit");
        reload();
        console.log("handleSubmit")
    }

    const handleCancel = async (e) => {
        e.preventDefault();
        console.log("ham cancel");
    }

    return (
        <>
            <div className="banner">
                <h1 className="title">Upload file</h1>
                <p>Share your favorite moments with the world!</p>
                <form onSubmit={handleSubmit} >
                    <textarea 
                        type="text" 
                        id="title" 
                        name="title" 
                        placeholder="Share your title" 
                        rows="4" cols="20"
                        style={{ width: "100%" }}></textarea>
                    <input type="file" name="image" id="choose-file" onChange={handleFile}></input>
                    <img src={image}
                        style={{
                            width: "300px",
                            height: "100%",
                            marginBottom: "0px"
                        }} alt="" />
                    <div className="btn">
                        <span id="fileName"></span>
                        <input type="submit" value="POST" className="submit-btn"/>
                        <button type="cancel" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                    </div>

                </form>
            </div>

            {/* <div className="d-flex justify-content-center bg-dark vh-100">
                <div className="w-25 bg-white mt-5 p-5">
                    <input type="file" name="image" onChange={handleFile}></input>
                    <br></br>
                    <img src={image} style={{ width: "200px", height: "100%" }} alt="" />
                </div>
            </div> */}
        </>

    );
}

export default UploadFile
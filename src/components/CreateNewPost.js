import Modal from 'react-modal';
import { useState } from 'react';
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import "./style.css"
Modal.setAppElement('#root');

const randomId = () => {
    return Math.random().toString(36).substr(2, 9) + '-' + Date.now().toString(36);
}

const rootData = {
    id: randomId(),
    userId : 100,
    title:`Post thu ${randomId()}`,
    // body: "",
    // image: "",
    like: 0,
    comment: 0,
    share: 0,
    postTime: new Date().toISOString()
}

function CreateNewPost(props) {
    const { onReload } = props;
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState();
    const presset_key = "insdataupload"
    const cloud_name = "insdata"
    const [data, setData] = useState(rootData)

    const closeModal = () => {
        setShowModal(false);
    }
    const openModal = () => {
        setShowModal(true);
    }

    const handleFile = (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", presset_key)
        axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            .then(res => setImage(res.data.secure_url))
            .catch(err => console.log(err))
    }

    // console.log(image)

    const handleOnChange= async (e)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        if(name === "image" && image!=null){
            setData({
                ...data,
                [name]: image 
            })
        }else{
            setData({
                ...data,
                [name]: value
            })
        }
        // console.log("ham on change")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data)
        const respone = await fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        
        const result = await respone.json();
        if(result){
            closeModal();
            onReload();
            Swal.fire({
                icon: 'success',
                title: 'Post created successfully!',
                showConfirmButton: false,
                timer: 1500
              })
            console.log("post created successfully")
        }
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <>
            <button onClick={openModal}>+ Add new product</button>
            <Modal
                isOpen={showModal}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <div className="banner">
                    <h1 className="title">Upload file</h1>
                    <p>Share your favorite moments with the world!</p>
                    <form  onSubmit={handleSubmit}>
                        <textarea
                            type="text"
                            id="title"
                            name="body"
                            onBlur={handleOnChange}
                            placeholder="Share your title"
                            rows="4" cols="20"
                            style={{ width: "100%" }}>
                        </textarea>
                        <input type="file" name="image" id="choose-file" onChange={handleFile}></input>
                        <img src= {image}
                            name="image"
                            onLoad={handleOnChange}
                            style={{
                                width: "300px",
                                height: "100%",
                                marginBottom: "0px"
                            }} alt="" />
                        <div className="btn">
                            <span id="fileName"></span>
                            <input type="submit" value="POST" className="submit-btn" />
                            <button type="cancel" className="cancel-btn" >Cancel</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default CreateNewPost
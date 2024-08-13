import { useEffect, useState } from "react";

import "./list.css"
function ListData(props){

    const {reload} = props;
    const [data , setData] = useState([]);
    // const [editReload , setEditReload] = useState(false);

    // const handleReload = () => {
    //     setEditReload(!editReload);
    // }


    // console.log(data);
    useEffect(() => {
        const fectApi = async () => {
            await fetch("http://localhost:3000/posts")
            .then(repsonse => repsonse.json())
            .then(result => setData(result.reverse()));
        }
        fectApi();
    } , [reload])

    return (
        <>
            <div className="post-list">
                {data.map((item) => (
                    <div className="post-item" key={item.id}>
                        <div className="post-image">
                            <img src={item.image} alt={item.title}></img>
                        </div>
                        <div className="post-reaction">
                            <p>{item.like}</p>
                            <p>{item.comment}</p>
                            <p>{item.share}</p>
                        </div>
                        <div className="post-content">
                            <h3>{item.title}</h3>
                            <p>{item.body}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ListData
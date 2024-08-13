import CreateNewPost from "./CreateNewPost";
import ListData from "./DataList";
import { useState } from "react";
function PostHome() {
    const [reload , setReload] = useState(false);
    const handleReload = () => {
        setReload(!reload)
    }
    return (
        <div>
            <h2>PostHome</h2>
            <CreateNewPost onReload = {handleReload}/>
            <ListData reload = {reload}/>
        </div>
    );
}
export default PostHome
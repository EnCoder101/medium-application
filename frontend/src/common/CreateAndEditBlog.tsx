import axios from "axios";
import { BACKEND_URL } from "../config";
import { BaseSyntheticEvent, useState } from "react";
import { CreatePostType } from "@enc0der101/common-for-medium-application/dist";
import { useNavigate } from "react-router-dom";

export default function CreateAndEditBlog() {
    const [postInput, setPostInput] = useState<CreatePostType>({
        title: "",
        content: ""
    })
    const [disable, setDisable] = useState(false)
    const navigate = useNavigate()

    const onTitleChange = (e: BaseSyntheticEvent) => {
        const { value } = e.target
        setPostInput((c) => ({
            ...c,
            title: value
        }))
    }

    const onContentChange = (e: BaseSyntheticEvent) => {
        const { value } = e.target
        setPostInput((c) => ({
            ...c,
            content: value
        }))
    }

    const postBlog = async () => {
        setDisable(true)
        const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
            title: postInput.title,
            content: postInput.content
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        setDisable(false)
        navigate(`/blog/${res.data.data.id}`)
    }


    return (
        <div className="flex flex-col pt-10 px-52">
            <div className="flex">
                <button onClick={postBlog} disabled={disable} ><img className="size-12 mr-5" src="add.png" alt="" /> </button>
                <input value={postInput?.title} onChange={onTitleChange} className="border-l-2 text-5xl pl-2 focus:outline-none w-full overflow-auto" type="text" placeholder="Title" />
            </div>
            <textarea value={postInput?.content} onChange={onContentChange} className="border-t-2 text-3xl mt-5 p-2 focus:outline-none" rows={18} placeholder="Tell you story....." />
        </div>
    )
}
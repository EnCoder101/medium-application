import { useState } from "react"


export default function ButtonInPostBlog() {
    const [selected,setSelected]= useState(-1)

    const handleClick = (val : number)=>{
        setSelected(val);
    }


    return (
        <div className="border-b-2 flex">
            <div className="p-1 px-2">
                {/* <img className="size-6" src="/plus.png" alt="" onClick={() => navigateToCreatePost()}/> */}
            </div>
            <div className={`p-1 mx-3 ${selected === 0 ? 'bg-gray-500/10 rounded-t-lg border-b-2 border-gray-500' : ''}`} onClick={() => handleClick(0)}>
                For You
            </div>
            <div className={`p-1 mx-3 ${selected === 1 ? 'bg-gray-500/10 rounded-t-lg border-b-2 border-gray-500' : ''}`} onClick={() => handleClick(1)}>
                Following
            </div>
        </div>
    )
}
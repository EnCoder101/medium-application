import { Link } from "react-router-dom";
import { Avator } from "./blogCard";

export default function MainHeader() {
    return (
        <>
            <div className="flex justify-between py-2 px-10">
                <div className="flex place-items-center">
                    <Link to={'/blogs'} className="cursor-pointer">
                        {/* <img src="public/medium_logo.png" /> */}
                        Medium
                    </Link>
                    {/* <div className="pl-3">
                        Draft Mode
                    </div>
                    <div className="pl-3">
                        Saved
                    </div> */}
                </div>
                <div className="flex place-items-center">
                    <Link to={'/createBlog'} className="mr-3 hover:cursor-pointer bg-green-600 p-0.5 px-2 rounded-md text-white">
                        Publish Blog
                    </Link>
                    <div className="size-7 mx-3 hover:cursor-pointer">
                        <img src="threeDots.png" alt="" />
                    </div>
                    {/* added Logout to bell Icon */}
                    <Link to={'/signin'} className="size-7 mx-1 mr-3 hover:cursor-pointer">
                        <img src="logout.png" alt="" />
                    </Link>
                    <div className="ml-3 hover:cursor-pointer px-2">
                        <Avator name="C" size="8" />
                    </div>
                </div>
            </div>
            <div className="border-b-2 border-slate-200 w-full drop-shadow-md"></div>
        </>
    )
}
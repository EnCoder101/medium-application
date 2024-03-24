import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import MainHeader from "../common/MainHeader"
import { Avator } from "../common/blogCard"
import Spinner from "../common/Spinner"

export const Blog = () => {
    const id = useParams()
    const { loading, blog } = useBlog({
        id: id.id || ""
    })
    if (loading) {
        return (
            <>
                <div>
                    <MainHeader />
                    <div className="h-screen flex justify-center flex-col">
                        <div className="flex justify-center">
                            <Spinner />
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <MainHeader />
            <div className="grid grid-cols-12 px-16 pt-10">
                <div className="col-span-8 px-5">
                    <div className="text-5xl font-bold">
                        {blog?.title}
                    </div>
                    <div className="text-md text-slate-500 pt-2">
                        Posted on 2nd April 2024
                    </div>
                    <div className="pt-4">
                        {blog?.content}
                    </div>
                </div>
                <div className="col-span-4 pl-2">
                    <div className="text-slate-500 font-semibold pb-3">
                        Author
                    </div>
                    <div className="flex items-center flex-row">
                        <div>
                            <Avator name={blog?.author.name || "Anoymous"} size="8" />
                        </div>
                        <div className="pl-4">
                            <div className="font-bold text-xl">
                                {blog?.author.name || "Anoymous"}
                            </div>
                            <div className="pt-1">
                                Random Phase for Author to attract the audience afhbisua bcffviusab oubc nas
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
import { Link } from "react-router-dom"

interface BlogCardpropType {
    name?: string
    publishedDate?: string
    header?: string
    content?: string
    id: number
}

export default function BlogCard({
    name = "Annonymous",
    publishedDate = "2 Feb 2023",
    header,
    content = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam repellat officiis odit consequatur voluptatibus voluptatem molestiae dolores vitae quas, optio nisi corporis accusantium sunt porro obcaecati laudantium exercitationem saepe dolore!",
    id
}: BlogCardpropType) {
    return (
        <Link to={`/blog/${id}`}>
            <div className="flex flex-col px-6 pt-2 pb-3 w-screen max-w-screen-md cursor-pointer">
                <div className="flex items-center pl-1">
                    <div className="pr-1">
                        <Avator name={name} size="6" />
                    </div>
                    <div className="p-1 font-thin text-sm pr-2">{name}</div>
                    <div className="text-slate-500 contents w-1 h-1">
                        &#9679;
                    </div>
                    <div className="p-1 text-slate-500 text-sm pl-2">{publishedDate}</div>
                </div>
                <div className="font-semibold text-xl pl-1 pb-2">{header}</div>
                <div className="pb-2 text-md font-thin">{content.slice(0, 100) + "..."}</div>
                <div className="flex justify-between">
                    <span className="flex items-center text-slate-600 font-thin">
                        {`${Math.ceil(content.length / 100)} minute(s) read`}
                    </span>
                    <div className="flex flex-row-reverse pt-2">
                        <div className="py-1 px-2"><img className="size-7" src="/threeDots.png" alt="" /></div>
                        <div className="py-1 px-2"><img className="size-6" src="/bookmark-white.png" alt="" /></div>
                        <div className="py-1 px-2"><img className="size-6" src="remove.png" alt="" /></div>
                    </div>
                </div>
                <div className="border-b-2 border-slate-100 w-full"></div>
            </div>
        </Link>
    )
}

export function Avator({ name, size }: { name: string, size: string }) {
    return (
        <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500`} >
            <span className="font-small text-gray-600 dark:text-gray-300">{name[0].toUpperCase()}</span>
        </div>
    )
}
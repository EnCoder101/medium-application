export default function BlogSkeleton() {
    return (
        <>
            <div role="status" className="animate-pulse">  
                <div className="flex flex-col px-6 pt-2 pb-3 w-screen max-w-screen-lg cursor-pointer">
                    <div className="flex items-center pl-1">
                        <div className="pr-1">
                            <div className="h-4 w-4 bg-gray-200 rounded-full mb-4"></div>
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        </div>

                        <div className="text-slate-500 contents w-1 h-1">
                            &#9679;
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    <div className="border-b-2 border-slate-100 w-full"></div>
                </div>
            </div>
        </>
    )
}
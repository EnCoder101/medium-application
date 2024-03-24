
import BlogSkeleton from "../common/BlogSkeleton";
import MainHeader from "../common/MainHeader";
import BlogCard from "../common/blogCard";
import ButtonInPostBlog from "../common/buttonInPostBlog";
import { useBlogs } from "../hooks";

export default function BlogPage() {
    const { loading, blogs } = useBlogs()
    if (loading) {
        return (
            <>
                <div>
                    <MainHeader />
                </div>
                <div className="flex justify-center w-3/4 flex-col items-center">
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </>
        )
    }
    return (
        <>
            <div>
                <MainHeader />
            </div>
            <div className="flex justify-center">
                <div className="px-20 pt-10">
                    <div>
                        <ButtonInPostBlog />
                    </div>
                    <div>
                        {blogs.map((blog) => (
                            <BlogCard
                                name={blog.author.name}
                                publishedDate={"2 April 2024"}
                                header={blog.title}
                                content={blog.content}
                                id={blog.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
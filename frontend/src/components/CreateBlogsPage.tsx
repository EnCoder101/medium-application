import CreateAndEditBlog from "../common/CreateAndEditBlog";
import MainHeader from "../common/MainHeader";

export default function CreateBlogPage() {
    return (
        <div className="flex flex-col">
            <div>
                <MainHeader />
            </div>
            <div>
                <CreateAndEditBlog />
            </div>
        </div>
    )
}
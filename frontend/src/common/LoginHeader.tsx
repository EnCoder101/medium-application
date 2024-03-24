interface headerProp {
    header?: string
    oneLiner?: string
    link?: string
    swtichPage : Function
}

export default function LoginHeader({
    header = "Create an account",
    oneLiner = "Already have any account?",
    link = "Log In",
    swtichPage
}: headerProp) {

    const changePage = ()=>{
        swtichPage()
    }

    return (
        <div className="text-center pb-4">
            <div className="text-3xl font-bold pb-1">
                {header}
            </div>
            <div className="text-sm text-gray-600/75">
                {oneLiner} <span className="hover:underline hover:cursor-pointer" onClick={changePage}> {link} </span>
            </div>
        </div>
    )
}
import { MouseEventHandler } from "react"

interface buttomProp {
    value: string
    onclick: MouseEventHandler
}

export default function MButton({ value, onclick }: buttomProp) {



    return (
        <div className="pt-3">
            <button className="bg-black text-white w-80 h-9 rounded-lg " type="button" onClick={onclick} >{value} </button>
        </div>
    )
}
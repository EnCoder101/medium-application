import PropTypes from 'prop-types';

interface inputprops {
    header : string
    placeholder : string
    value : string | undefined
    type? : string 
    setValue : Function
}

export default function MInput({ header,
     placeholder,
     type = "text",
     value = "",
     setValue
     } : inputprops) {
        
        const onValueChange = (e: any)=>{
            const {value} = e.target
            setValue(value)
        }

    return (
        <div className="flex flex-col items-start pb-3">
            <div className="text-xl font-bold pl-2 pb-2">
                {header}
            </div>
            <div className="">
                <input className="border-black border-2 rounded-lg pl-4 w-80 h-9" type={type} placeholder={placeholder} value={value} onChange={onValueChange} />
            </div>
        </div>
    )
}

MInput.PropTypes = {
    header: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired

}
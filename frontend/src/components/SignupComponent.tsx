import { useState } from "react";
import LoginHeader from "../common/LoginHeader";
import MButton from "../common/MButton";
import MInput from "../common/MInput";
import { SignupType } from "@enc0der101/common-for-medium-application/dist";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function SignupComponent() {
    const [signUpInput, setSignUpInput] = useState<SignupType>({
        name: "",
        email: "",
        password: "",
    })
    const navigate = useNavigate()


    const onNameChange = (value: string) => {
        setSignUpInput((c) => ({
            ...c,
            name: value
        }))
    }

    const onEmailChange = (value: string) => {
        setSignUpInput((c) => ({
            ...c,
            email: value
        }))
    }

    const onPasswordChange = (value: string) => {
        setSignUpInput((c) => ({
            ...c,
            password: value
        }))
    }

    const swtichPage = () => {
        navigate('/signin')
    }

    const sendRequest = async () => {
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,
                {
                    email: signUpInput.email,
                    password: signUpInput.password,
                    name: signUpInput.name
                }
            )
            const jwt = res.data.data;
            localStorage.setItem("token", `Bearer ${jwt}`);
            navigate("/blogs")
        }
        catch (err) {
            alert("Input Error")
        }
    }

    return (
        <>
            <LoginHeader swtichPage={swtichPage} />
            <MInput header="Username" placeholder="Enter Your Name" value={signUpInput.name} setValue={onNameChange} />
            <MInput header="Email" placeholder="Enter Your Email" value={signUpInput.email} setValue={onEmailChange} />
            <MInput header="Password" placeholder="Password" type="password" value={signUpInput.password} setValue={onPasswordChange} />
            <MButton value="Sign Up" onclick={sendRequest} />
        </>
    )
}
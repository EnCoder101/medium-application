import { useState } from "react";
import LoginHeader from "../common/LoginHeader";
import MInput from "../common/MInput";
import MButton from "../common/MButton";
import { SigninType } from "@enc0der101/common-for-medium-application/dist"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";


export default function SigninComponent() {
    const [signInInput, setSignInInput] = useState<SigninType>({
        email: "",
        password: "",
    })

    const navigate = useNavigate()

    const onEmailChange = (value: string) => {
        setSignInInput((c) => ({
            ...c,
            email: value
        }))
    }

    const onPasswordChange = (value: string) => {
        setSignInInput((c) => ({
            ...c,
            password: value
        }))
    }

    const switchPage = () => {
        navigate('/signup')
    }

    const sendRequest = async () => {
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                email: signInInput.email,
                password: signInInput.password
            })
            if (res.data?.data?.message === "user not found") {
                alert("User Not Found. PLease Sign Up")
            } else {
                const jwt = res.data.data;
                localStorage.setItem("token", `Bearer ${jwt}`);
                navigate("/blogs")
            }
        }
        catch (err) {
            alert("Input Error")
        }
    }

    return (
        <>
            <LoginHeader header="Login to your account" oneLiner="Don't have a account? " link="Sign Up" swtichPage={switchPage} />
            <MInput header="Email" placeholder="Enter Your Email" value={signInInput.email} setValue={onEmailChange} />
            <MInput header="Password" placeholder="Password" type="password" value={signInInput.password} setValue={onPasswordChange} />
            <MButton value="Sign In" onclick={sendRequest} />
        </>
    )
}
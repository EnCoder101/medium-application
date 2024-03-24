import SignupComponent from "../components/SignupComponent";
import SigninComponent from "../components/SigninCompoent";
import Quotes from "../components/Quotes";
import { Navigate, Route, Routes } from "react-router-dom";

export default function LandingPage() {
    return (
        <>
            <div className="flex text-center h-screen justify-center">
                <div className="w-1/2 flex justify-center items-center flex-col">
                    <Routes>
                        <Route path="/" element={<Navigate to="signin" replace={true} />} />
                        <Route
                            path="/signin"
                            element={<SigninComponent />}
                        />
                        <Route
                            path="/signup"
                            element={<SignupComponent />}
                        />
                    </Routes>
                </div>
                <div className="w-1/2 bg-slate-400/90 hidden justify-center items-center sm:flex">
                    <Quotes />
                </div>
            </div>
        </>
    )
}
import { React, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Helmet from "react-helmet";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { updateDoc } from "firebase/firestore/lite";
import { doc, Timestamp } from "firebase/firestore";

export default function Login({ setModal }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("successfully logined");
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
                isOnline: true,
                LastLogin: Timestamp.fromDate(new Date()),
            });
            navigate("/home");
        } catch (err) {
            alert(err.message);
            setEmail("");
            setPassword("");
        }
    };
    function useOutsideClick(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setModal(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef);
    return (
        <>
            <Helmet>
                <title>Login Now</title>
            </Helmet>
            <MainContainer>
                <Wrapper>
                    <Container>
                        <RightContainer ref={wrapperRef}>
                            <LoginContainer>
                                <LoginHeading>
                                    Login to your Account
                                </LoginHeading>
                                <LoginInfo>
                                    Enter email and password to login
                                </LoginInfo>
                                <Form>
                                    <InputContainer>
                                        <TextInput
                                            type="email"
                                            placeholder="Email"
                                            onChange={(e) =>
                                                setEmail(e.currentTarget.value)
                                            }
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <TextInput
                                            type="password"
                                            placeholder="Password"
                                            onChange={(e) =>
                                                setPassword(
                                                    e.currentTarget.value
                                                )
                                            }
                                        />
                                    </InputContainer>
                                    <MainButtonContainer>
                                        <SignupButton
                                            onClick={() => {
                                                setModal(false);
                                            }}
                                        >
                                            Create Account?
                                        </SignupButton>
                                        <ForgotButton>
                                            Forgot Password?
                                        </ForgotButton>
                                    </MainButtonContainer>
                                    <ButtonContainer>
                                        <SubmitButton onClick={handleSubmit}>
                                            Login
                                        </SubmitButton>
                                    </ButtonContainer>
                                </Form>
                            </LoginContainer>
                        </RightContainer>
                    </Container>
                </Wrapper>
            </MainContainer>
        </>
    );
}

//   .card:hover {
//     color: rgb(88 199 250 / 100%);
//     transition: color 1s;
//   }
//   .card:hover:before, .card:hover:after {
//     animation: none;
//     opacity: 0;
//   }

//   .card::before {
//     content: "";
//     width: 104%;
//     height: 102%;
//     border-radius: 8px;
//     background-image: linear-gradient(
//       var(--rotate)
//       , #5ddcff, #3c67e3 43%, #4e00c2);
//       position: absolute;
//       z-index: -1;
//       top: -1%;
//       left: -2%;
//       animation: spin 2.5s linear infinite;
//   }

//   .card::after {
//     position: absolute;
//     content: "";
//     top: calc(var(--card-height) / 6);
//     left: 0;
//     right: 0;
//     z-index: -1;
//     height: 100%;
//     width: 100%;
//     margin: 0 auto;
//     transform: scale(0.8);
//     filter: blur(calc(var(--card-height) / 6));
//     background-image: linear-gradient(
//       var(--rotate)
//       , #5ddcff, #3c67e3 43%, #4e00c2);
//       opacity: 1;
//     transition: opacity .5s;
//     animation: spin 2.5s linear infinite;
//   }
const MainButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
const SignupButton = styled.a`
    font-size: 14px;
    font-weight: 550;
    cursor: pointer;
`;
const MainContainer = styled.section`
    position: absolute;
    top: 15%;
    width: 100%;
    backdrop-filter: blur(2px);
    z-index: 100;
`;
const Wrapper = styled.div`
    width: 90%;
    margin: 0 auto;
`;
const Container = styled.div``;
const RightContainer = styled.div`
    border-radius: 20px;
    padding: 30px;
    color: #000;
    width: 31%;
    height: 420px;
    margin: 0 auto;
    background: #fff;
    @media all and (max-width: 1080px) {
        width: 80%;
        padding: 0 55px 55px;
    }
`;
const LoginContainer = styled.div`
    border-bottom: 1px solid #fff;
    width: 100%;
`;
const LoginHeading = styled.h3`
    font-size: 27px;
    font-weight: bold;
    margin-bottom: 20px;
`;
const LoginInfo = styled.p`
    font-size: 18px;
    margin-bottom: 35px;
`;
const Form = styled.form`
    width: 100%;
    display: block;
`;
const InputContainer = styled.div`
    margin-bottom: 15px;
    position: relative;
    &:before {
    }
`;
const TextInput = styled.input`
    padding: 20px 25px 20px 30px;
    width: 93%;
    display: block;
    border: none;
    border-radius: 10px;
    font-size: 18px;
    outline: none;
    @media all and (max-width: 640px) {
        width: 100%;
    }
`;
const ForgotButton = styled.a`
    margin-bottom: 25px;
    font-size: 15px;
    text-decoration: none;
    color: red;
    cursor: pointer;
    font-weight: 550;
`;
const SubmitButton = styled.a`
    background: #000;
    border: 0;
    outline: 0;
    color: #fff;
    padding: 15px 30px;
    border-radius: 8px;
    font-size: 20px;
    cursor: pointer;
    text-decoration: none;
    border: 1px solid;
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

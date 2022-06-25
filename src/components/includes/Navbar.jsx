import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

function Navbar() {
    const Logout = async () => {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
            isOnline: false,
        });
        signOut(auth)
            .then(() => {
                console.log("signout success");
            })
            .catch((error) => {});
    };
    return (
        <NavbarTop>
            <Wrap className="wrapper">
                <MainList>
                    <Childone>
                        <HeadDiv>
                            <LogoImg src={require("../../assets/chat.webp")} />
                        </HeadDiv>
                    </Childone>
                    <Childtwo>
                        <DashboardLink onClick={Logout} className="Margin">
                            SignOut
                        </DashboardLink>
                        <DashboardLink className="Margin">
                            Edit Profile
                        </DashboardLink>
                        <Button>
                            <IoIosNotificationsOutline />
                            <Badge>
                                <Priced>{1}</Priced>
                            </Badge>
                        </Button>
                        <Profile>
                            <CgProfile />
                        </Profile>
                    </Childtwo>
                </MainList>
            </Wrap>
        </NavbarTop>
    );
}
const Profile = styled.span``;
const Wrap = styled.div``;
const Priced = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Button = styled.a`
    color: white;
    cursor: pointer;
    position: relative;
    :hover {
        color: white;
    }
`;
const Badge = styled.div`
    background: green;
    border-radius: 84px;
    position: absolute;
    top: 10px;
    left: 11px;
    width: 130%;
    height: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const NavbarTop = styled.section`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 300;
    background: #000;
`;
const MainList = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Childone = styled.div``;
const HeadDiv = styled.div`
    width: 100px;
    cursor: pointer;
    overflow: hidden;
    border-radius: 3px;
    @media all and (max-width: 768px) {
        width: 100px;
    }
`;
const LogoImg = styled.img`
    display: block;
    width: 100%;
`;
const Childtwo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const DashboardLink = styled.a`
    text-decoration: none;
    font-size: 16px;
    border: 2px solid #fff;
    border-radius: 5px;
    color: #fff;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    margin-right: 10px;
    cursor: pointer;
    &.Margin {
        margin-right: 10px;
    }
    @media all and (max-width: 640px) {
        width: 100px;
    }
`;

export default Navbar;
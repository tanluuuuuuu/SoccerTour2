import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/user";

const Container = styled.div`
    position: fixed;
    width: 100vw;
    height: 4;

    display: flex;
    align-items: center;

    top: 0;

    transition: width 1s;
    z-index: 9;
`;

const SidebarContainer = styled.div`
    position: relative;
    background-color: #bcbcbc;
    width: 100%;
    height: 80%;
    color: #fff;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 9;
`;

const ListItem = styled.ul`
    list-style: none;
    flex: 2;
    margin: 0;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    
`;

const Item = styled.li`
    cursor: pointer;
    padding: 0.5rem;

    & a {
        color: inherit;
    }

    &:hover {
        background-color: #aaa;
        transition: all 0.5s;
    }
`;

const ProfileContainer = styled.div`
    flex: 1;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Profile = styled.img`
    width: 50px;
    height: 50px;

    border-radius: 50%;

    object-fit: cover;
    position: absolute;
    bottom: 0;
    margin-bottom: 50px;

    cursor: pointer;
`;

function Sidebar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.user);
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        dispatch(logout());
        history.push("/");
    };

    return (
        <Container>
            <SidebarContainer>
                <ListItem>
                    <Item>
                        <Link to={"/"} className="text-decoration-none">
                            <p className="fs-5 mb-0">Trang chủ</p>
                        </Link>
                    </Item>

                    {user.role === "teamManager" ? (
                        <Item>
                            <Link
                                to={"/newteam"}
                                className="text-decoration-none"
                            >
                                <p className="fs-5 mb-0">Đơn đăng ký</p>
                            </Link>
                        </Item>
                    ) : (
                        <></>
                    )}

                    {user.role === "admin" ? (
                        <Item>
                            <Link
                                to={"/registerlist"}
                                className="text-decoration-none"
                            >
                                <p className="fs-5 mb-0">Các đơn đăng ký</p>
                            </Link>
                        </Item>
                    ) : (
                        <></>
                    )}

                    {user.role === "admin" ? (
                        <Item>
                            <Link
                                to={"/calendar"}
                                className="text-decoration-none"
                            >
                                <p className="fs-5 mb-0">Lịch thi đấu</p>
                            </Link>
                        </Item>
                    ) : (
                        <></>
                    )}

                    {user.role === "teamManager" ? (
                        <Item>
                            <Link
                                to={"/teamcalendar"}
                                className="text-decoration-none"
                            >
                                <p className="fs-5 mb-0">Lịch thi đấu</p>
                            </Link>
                        </Item>
                    ) : (
                        <></>
                    )}

                    <Item>
                        <Link to={"/search"} className="text-decoration-none">
                            <p className="fs-5 mb-0">Tìm kiếm cầu thủ</p>
                        </Link>
                    </Item>

                    {user.role === "admin" ? (
                        <Item>
                            <Link to={"/rule"} className="text-decoration-none">
                                <p className="fs-5 mb-0">Quy định giải đấu</p>
                            </Link>
                        </Item>
                    ) : (
                        <></>
                    )}
                    {user.role === "teamManager" ? (
                        <Item>
                            <Link to={"/user"} className="text-decoration-none">
                                <p className="fs-5 mb-0">Người dùng</p>
                            </Link>
                        </Item>
                    ) : (
                        <></>
                    )}

                    {user.role === "admin" ? (
                        <Item>
                            <Link
                                to={"/userlist"}
                                className="text-decoration-none"
                            >
                                <p className="fs-5 mb-0">Danh sách người dùng</p>
                            </Link>
                        </Item>
                    ) : (
                        <></>
                    )}
                </ListItem>
                <ProfileContainer>
                    <Button variant="light" size="sm" onClick={handleLogout}>
                        Đăng xuất
                    </Button>
                </ProfileContainer>
            </SidebarContainer>
        </Container>
    );
}

export default Sidebar;

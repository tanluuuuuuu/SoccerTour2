import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
    Button,
    Form,
    Row,
    Col,
    Card,
    Spinner,
    Navbar,
    Nav,
    Modal,
    Alert,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { getRanking, getRankingPlayer } from "../../actions/tour.js";
import { signin, signup } from "../../actions/user.js";
import MotionHoc from "../../components/MotionHoc.js";

const initializeRegisterFormData = {
    phoneNumber: "",
    country: "",
    userName: "",
    password: "",
};

const initializeLoginFormData = {
    phoneNumber: "",
    password: "",
};

function HomeTourComponent({ isLoading }) {
    const dispatch = useDispatch();

    const tour = useSelector((state) => state.tour);
    const awayMatches = tour?.calendar?.awayMatches;
    const homeMatches = tour?.calendar?.homeMatches;

    const user = useSelector((state) => state.user);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [loginFormData, setLoginFormData] = useState(initializeLoginFormData);
    const [registerFormData, setRegisterFormData] = useState(
        initializeRegisterFormData
    );
    const [reenterPassword, setReenterPassword] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    useEffect(() => {
        setRegisterFormData(initializeRegisterFormData);
        setReenterPassword("");
    }, [isSuccess]);
    const history = useHistory();

    useEffect(() => {
        if (user.isLogin) {
            history.push("/");
        }
    }, [user]);

    const loginFormClose = () => {
        setLoginFormData(initializeLoginFormData);
        setShowLoginForm(false);
    };

    const loginFormHandleChange = (e) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    };

    const erMessage = useSelector((state) => state.erMessage);
    useEffect(() => {
        if (user.isLogin) loginFormClose();
    }, [user]);
    const loginFormSubmit = async (e) => {
        e.preventDefault();
        await dispatch(signin(loginFormData));
    };

    const registerFormHandleChange = (e) => {
        setRegisterFormData({
            ...registerFormData,
            [e.target.name]: e.target.value,
        });
    };

    const registerFormSubmit = async (e) => {
        e.preventDefault();
        if (reenterPassword && reenterPassword === registerFormData.password) {
            await dispatch(signup(registerFormData, setIsSuccess));
        } else {
            alert("Please confirm password");
        }
    };

    const Ranking = () => {
        return (
            <Container className="mt-3">
                <h3 className="text-center bg-primary text-white">
                    B???ng x???p h???ng
                    <span
                        style={{
                            fontSize: "1rem",
                            position: "absolute",
                            cursor: "pointer",
                        }}
                    >
                        <i
                            className="fa-solid fa-rotate"
                            onClick={() => dispatch(getRanking())}
                        ></i>
                    </span>
                </h3>
                <Row className="text-center">
                    <Col xs={6}>
                        <b>T??n ?????i b??ng</b>
                    </Col>
                    <Col xs={3}>
                        <b>Hi???u s???</b>
                    </Col>
                    <Col xs={3}>
                        <b>??i???m s???</b>
                    </Col>
                </Row>
                {tour?.ranking?.map((team) => (
                    <Card className="mt-2" key={team.teamName}>
                        <Card.Body className="text-center">
                            <Row>
                                <Col xs={6}>{team.teamName}</Col>
                                <Col xs={3}>{team.goalDifference}</Col>
                                <Col xs={3}>{team.point}</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        );
    };

    const RankingPlayer = () => {
        return (
            <Container className="mt-3">
                <h3 className="text-center bg-primary text-white">
                    B???ng x???p h???ng c???u th???
                    <span
                        style={{
                            fontSize: "1rem",
                            position: "absolute",
                            cursor: "pointer",
                        }}
                    >
                        <i
                            className="fa-solid fa-rotate"
                            onClick={() => dispatch(getRankingPlayer())}
                        ></i>
                    </span>
                </h3>
                <Row className="text-center">
                    <Col xs={6}>
                        <b>T??n c???u th???</b>
                    </Col>
                    <Col xs={3}>
                        <b>B??n th???ng</b>
                    </Col>
                    <Col xs={3}>
                        <b>Ki???n t???o</b>
                    </Col>
                </Row>
                {tour?.rankingPlayer?.map((player) => (
                    <Card className="mt-2" key={player.playerName}>
                        <Card.Body className="text-center">
                            <Row>
                                <Col xs={6}>{player.playerName}</Col>
                                <Col xs={3}>{player.allGoals.length}</Col>
                                <Col xs={3}>{player.allAssists.length}</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        );
    };

    const MatchHappen = () => {
        return (
            <Container className="mt-3">
                <Card>
                    <Card.Header className="bg-primary">
                        <h3 className="text-center text-white">L???ch thi ?????u</h3>
                    </Card.Header>
                    <Card.Body>
                        {homeMatches?.map((round) =>
                            round.matches.map((match) => (
                                <Card className="mt-2" key={match?._id}>
                                    <Card.Body className="text-center">
                                        <Row>
                                            <Col xs={5}>
                                                {match?.team1?.teamName}
                                            </Col>
                                            <Col xs={2}>VS</Col>
                                            <Col xs={5}>
                                                {match?.team2?.teamName}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            ))
                        )}

                        {awayMatches?.map((round) =>
                            round.matches.map((match) => (
                                <Card className="mt-2" key={match?._id}>
                                    <Card.Body className="text-center">
                                        <Row>
                                            <Col xs={5}>
                                                {match?.team1?.teamName}
                                            </Col>
                                            <Col xs={2}>VS</Col>
                                            <Col xs={5}>
                                                {match?.team2?.teamName}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            ))
                        )}
                    </Card.Body>
                </Card>
            </Container>
        );
    };

    const TourGallery = () => {
        return (
            <Container className="my-5">
                <Card border="primary">
                    <Card.Header className="bg-primary">
                        <h3 className="text-center text-white">
                            {tour.tourName}
                        </h3>
                    </Card.Header>
                    <Card.Body>
                        <MatchHappen />
                        <Row>
                            <Col>
                                <Ranking />
                            </Col>
                            <Col>
                                <RankingPlayer />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        );
    };

    return (
        <Container>
            {!user.isLogin ? (
                <>
                    <Navbar className="bg-white">
                        <Container>
                            <Navbar.Brand>Gi???i v?? ?????ch qu???c gia</Navbar.Brand>
                            <Nav>
                                <Button
                                    className="bg-secondary mx-2"
                                    onClick={() => setShowLoginForm(true)}
                                >
                                    ????ng nh???p
                                </Button>
                                <Button
                                    className="bg-secondary"
                                    onClick={() => setShowRegisterForm(true)}
                                >
                                    ????ng k??
                                </Button>
                            </Nav>
                        </Container>
                    </Navbar>
                </>
            ) : (
                <></>
            )}
            {isLoading ? (
                <Container className="text-center">
                    <Spinner animation="grow" />
                </Container>
            ) : (
                <TourGallery />
            )}

            {/* <ModalLogin /> */}
            <Modal
                show={showLoginForm}
                onHide={() => {
                    loginFormClose();
                    dispatch({ type: "CLR_ER_MESSAGE", payload: null });
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>????ng nh???p</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {erMessage.length > 0 ? (
                        <Alert variant="secondary">{erMessage}</Alert>
                    ) : (
                        <></>
                    )}
                    <Form onSubmit={loginFormSubmit}>
                        <Row className="my-2">
                            <Col>
                                <Form.Label>T??n ????ng nh???p</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nh???p username"
                                    name="userName"
                                    onChange={loginFormHandleChange}
                                    value={loginFormData.userName}
                                    autoFocus
                                />
                            </Col>
                        </Row>
                        <Row className="my-2">
                            <Col>
                                <Form.Label>M???t kh???u</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Nh???p m???t kh???u"
                                    name="password"
                                    onChange={loginFormHandleChange}
                                    value={loginFormData.password}
                                />
                            </Col>
                        </Row>
                        <Row className="my-2">
                            <Col className="text-center">
                                <Button
                                    variant="secondary"
                                    type="submit"
                                    className="w-100"
                                    onClick={loginFormSubmit}
                                >
                                    ????ng nh???p
                                </Button>
                            </Col>
                        </Row>

                        <Row className="my-4">
                            <p className="my-1">
                                <small>Ch??a c?? t??i kho???n?</small>
                            </p>
                            <Col>
                                <Button
                                    variant="secondary"
                                    className="w-100"
                                    onClick={() => {
                                        loginFormClose();
                                        setShowRegisterForm(true);
                                    }}
                                >
                                    ????ng k??
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* <ModalRegister /> */}
            <Modal
                show={showRegisterForm}
                onHide={() => {
                    setShowRegisterForm(false);
                    if (isSuccess) {
                        setIsSuccess(false);
                    }
                    dispatch({ type: "CLR_ER_MESSAGE", payload: null });
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>????ng k??</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {erMessage.length > 0 ? (
                        <Alert variant="secondary">{erMessage}</Alert>
                    ) : (
                        <></>
                    )}
                    <Form onSubmit={registerFormSubmit}>
                        {!isSuccess ? (
                            <>
                                <Row className="my-2">
                                    <Col>
                                        <Form.Label>S??? ??i???n tho???i</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            placeholder="Nh???p s??? ??i???n tho???i"
                                            name="phoneNumber"
                                            pattern="[0-9]{10}"
                                            value={registerFormData.phoneNumber}
                                            onChange={registerFormHandleChange}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>Country</Form.Label>
                                        <Form.Select
                                            aria-label="Default select example"
                                            onChange={registerFormHandleChange}
                                            name="country"
                                        >
                                            <option>Select your country</option>
                                            <option value="Vi???t Nam">
                                                Vi???t Nam
                                            </option>
                                            <option value="Other">Other</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row className="my-2">
                                    <Col>
                                        <Form.Label>T??n t??i kho???n</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nh???p t??n t??i kho???n"
                                            name="userName"
                                            value={registerFormData.userName}
                                            onChange={registerFormHandleChange}
                                        />
                                    </Col>
                                </Row>
                                <Row className="my-2">
                                    <Col>
                                        <Form.Label>M???t kh???u</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Nh???p m???t kh???u"
                                            name="password"
                                            value={registerFormData.password}
                                            onChange={registerFormHandleChange}
                                        />
                                    </Col>
                                </Row>
                                <Row className="my-2">
                                    <Col>
                                        <Form.Label>
                                            X??c nh???n m???t kh???u
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Nh???p l???i m???t kh???u"
                                            name="reenterPassword"
                                            value={reenterPassword}
                                            onChange={(e) =>
                                                setReenterPassword(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Col>
                                </Row>
                            </>
                        ) : (
                            <></>
                        )}

                        <Row className="my-2">
                            <Col className="text-center">
                                <Button
                                    variant={isSuccess ? "primary" : "secondary"}
                                    className="w-100"
                                    type="submit"
                                    disabled={isSuccess}
                                >
                                    {isSuccess
                                        ? "????ng k?? th??nh c??ng"
                                        : "X??c nh???n ????ng k??"}
                                </Button>
                            </Col>
                        </Row>
                        {isSuccess ? (
                            <Row className="my-2">
                                <Col className="text-center">
                                    <Button
                                        variant="dark"
                                        className="w-100"
                                        onClick={() => {
                                            setShowRegisterForm(false);
                                            setShowLoginForm(true);
                                            setIsSuccess(false);
                                        }}
                                    >
                                        ?????n m??n h??nh ????ng nh???p
                                    </Button>
                                </Col>
                            </Row>
                        ) : (
                            <></>
                        )}
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

const HomeTour = MotionHoc(HomeTourComponent);

export default HomeTour;

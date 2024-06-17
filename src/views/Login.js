import React, {useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {auth} from "../services/AuthService";
import {ContentLoading} from "../components/Loading";

import '../static/Login.css'

export const Login = () => {

    const navigate = useNavigate();

    const [isLogging, setIsLogging] = useState(false)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function onLoginSubmit(event) {
        event.preventDefault();

        setIsLogging(true);

        let response;

        setTimeout(async () => {
            response = await auth(username, password);

            if (response && response.status === 200) {
                localStorage.setItem("accessToken", response.resp);
                navigate('/home/files');
            }

            setIsLogging(false);
        }, 300)
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "black",
            width: "100vw",
            height: "60vh"
        }}>
            {isLogging ? <ContentLoading padding={5}/> :
                <Form onSubmit={onLoginSubmit} style={{width: '30%', height: '40%', marginTop: "2%"}}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Username
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                id='login-form'
                                type="text"
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                }}
                            />
                        </Col>
                        <Form.Label column sm="2">
                            Password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                id='login-form'
                                type="password"
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                            />
                        </Col>
                        <div style={{display: "flex", justifyContent: "end", margin: "2px"}}>
                            <Link to="/">
                                <Button id='login-form' style={{width: "100%", margin: 0}}>Cancel</Button>
                            </Link>
                            <Form.Control
                                type='submit'
                                value="Login"
                                disabled={isLogging}
                                id='login-form'
                                style={{
                                    width: "40%",
                                    margin: 0,
                                }}
                            />
                        </div>
                    </Form.Group>
                </Form>}
        </div>
    )
}

export default Login;
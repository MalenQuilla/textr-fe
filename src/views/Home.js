import {Button, Form, Nav} from "react-bootstrap";
import {Link, Outlet, useNavigate} from "react-router-dom";
import React, {createContext, useState} from "react";

import '../static/Home.css';
import {useForm} from "react-hook-form";
import {search, upload} from "../services/FilesUtilsService";
import {logout} from "../services/AuthService";
import {ButtonLoading, ContentLoading} from "../components/Loading";
import {Toaster} from "../components/Toaster";

export const GlobalContext = createContext({});

function Home() {

    const [isLoading, setIsLoading] = useState(false);

    const [isUploading, setIsUploading] = useState(false);

    const [term, setTerm] = useState('');

    const [searchResult, setSearchResult] = useState(null);

    const navigate = useNavigate();

    const {register, handleSubmit} = useForm();

    async function onFileUpload(data) {
        setIsUploading(true);
        const id = Toaster.loading("Uploading...")

        let response;

        setTimeout(async () => {
            response = await upload(data);

            if (response && response.status === 200) {
                Toaster.update(id, response.msg, "success", false)
                navigate('/home/files');
            } else Toaster.update(id, "Upload failed", "error", false)
            setIsUploading(false);
        }, 1500);
    }

    async function onSearch(event) {
        event.preventDefault();

        !isLoading && await searchFiles(term);
    }

    async function searchFiles(term) {
        if (term === null)
            term = this.term;

        setIsLoading(true);

        let response;

        setTimeout(async () => {
            response = await search(term);

            response ? setSearchResult(response.resp) : setSearchResult(null);
            navigate('/home/search');

            setIsLoading(false);
        }, 200);
    }

    return (
        <GlobalContext.Provider value={{searchResult, isUploading, searchFiles}}>
            <div id="home-container">
                <div style={{width: "15%", height: "100%", position: 'fixed'}}>
                    <h2 style={{marginBottom: "25px", justifyContent: 'center', alignContent: 'center'}}>ULake</h2>
                    <Nav className="flex-column">
                        <Form onSubmit={handleSubmit(onFileUpload)} style={{marginBottom: "10%"}}>
                            <Form.Control type="file" {...register("file")} id='upload-form'/>
                            {isUploading ? <Button id='upload-form'><ButtonLoading/></Button> :
                                <Form.Control type="submit" value="Upload" id='upload-form' disabled={isUploading}/>}
                        </Form>
                        <Link to="/home/files">
                            <Button id='menu-btn'>
                                My Files
                            </Button>
                        </Link>
                        <Link to="/home/scheduled">
                            <Button id='menu-btn'>
                                Scheduled
                            </Button>
                        </Link>
                        <Link to="/home/indexed">
                            <Button id='menu-btn'>
                                Indexed
                            </Button>
                        </Link>
                        <Button id='menu-btn' onClick={logout} style={{marginTop: '10%'}}>
                            Logout
                        </Button>
                    </Nav>
                </div>

                <div style={{marginLeft: "17%", width: "85%", height: "100%"}}>
                    <div style={{marginBottom: "25px", position: "fixed", width: "50%"}}>
                        <Form onSubmit={onSearch}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    id='search-bar'
                                    type="text"
                                    onChange={(e) => {
                                        let tmp = e.target.value;
                                        setTerm(tmp);
                                        searchFiles(tmp);
                                    }}
                                    placeholder="Search"
                                />
                            </Form.Group>
                        </Form>
                    </div>
                    <div id='rounded-corner'>
                        {isLoading ? <ContentLoading padding={20}/> : <Outlet/>}
                    </div>
                </div>
            </div>
        </GlobalContext.Provider>
    )
}

export default Home;
import React, {useContext} from "react";
import {GlobalContext} from "./Home";
import {Button} from "react-bootstrap";

import {download} from "../services/FilesUtilsService";
import {NotFound} from "../components/NotFound";
import {deleteFile} from "../services/FilesManService";

function SearchResults() {
    const {searchResult, searchFiles} = useContext(GlobalContext);

    console.log(searchResult);

    async function deleteAndRefresh(fid) {
        await deleteFile(fid);
        await searchFiles()
    }

    return (
        <div style={{position: 'relative'}}>
            <div id='fixed-title'>
                <h3>Search results</h3>
            </div>
            <div id='contents-outlet'>
                <ul>
                    {searchResult ? searchResult.map((item) => (
                        <div key={item.document.id} id='outlet-items'>
                            <div style={{width: '80%'}}>
                                <h4>{item.fileModel.name}</h4>
                                <p dangerouslySetInnerHTML={{__html: `... ${item.highlightContents.join(' ... ')} ...`}}/>
                            </div>
                            <div id='outlet-utils'
                                 style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <Button id='utils-btn' onClick={() => download(item.fileModel.id)}>Download</Button>
                                <Button id='utils-btn'
                                        onClick={() => deleteAndRefresh(item.fileModel.id)}>Delete</Button>
                            </div>
                        </div>
                    )) : <NotFound padding={20}/>}
                </ul>
            </div>
        </div>
    )
}

export default SearchResults
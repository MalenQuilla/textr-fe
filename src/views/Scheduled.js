import React, {useEffect} from 'react';
import {Button} from 'react-bootstrap';
import {deleteFile, getScheduled} from "../services/FilesManService";
import {download} from "../services/FilesUtilsService";
import {ButtonLoading, ContentLoading} from "../components/Loading";
import {NotFound} from "../components/NotFound";
import {PaginationConfig} from "../services/PaginationConfig";

function Files() {

    const [files, setFiles] = React.useState(null);

    const [page, setPage] = React.useState(0);

    const [isLoading, setIsLoading] = React.useState(false);

    const [hasMore, setHasMore] = React.useState(true);

    useEffect(() => {
        fetch()
    }, [page]);

    async function fetch() {
        setIsLoading(true);
        let response;

        setTimeout(async () => {
            response = await getScheduled(page, PaginationConfig.size);

            setHasMore(response);

            response ? (files ? setFiles((prev) => [...prev, ...response.resp]) : setFiles(response.resp)) : setFiles(files);

            setIsLoading(false);
        }, 500);
    }

    async function fetchMore() {
        setPage((prev) => prev + 1);
    }

    async function deleteAndRefresh(id) {
        await deleteFile(id);
        await this.fetch();
    }

    return (
        <div>
            {page === 0 && isLoading ? <ContentLoading padding={20}/> :
                <div>
                    <div id='fixed-title'>
                        <h3>Scheduled</h3>
                    </div>
                    <div id='contents-outlet'>
                        <ul>
                            {files ? files.map((item) => (
                                <div key={item.id} id='outlet-items'>
                                    <h4 style={{width: '80%', alignContent: 'center'}}>{item.name}</h4>
                                    <div id='outlet-utils'>
                                        <Button id='utils-btn' onClick={() => download(item.id)}>Download</Button>
                                        <Button id='utils-btn' onClick={() => deleteAndRefresh(item.id)}>Delete</Button>
                                    </div>
                                </div>
                            )) : <NotFound padding={20}/>}
                        </ul>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button id="utils-btn" onClick={fetchMore} disabled={!hasMore}>
                                {hasMore ? (isLoading ? <ButtonLoading/> : "Load More") : "Oops! Nothing to load."}
                            </Button>
                        </div>
                    </div>
                </div>}
        </div>
    );
}

export default Files;

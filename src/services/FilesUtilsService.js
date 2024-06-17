import {ApiService} from "./ApiService";
import {Toaster} from "../components/Toaster";

export async function upload(data) {
    try {
        const fileInfo = {
            name: data.file[0].name,
            size: data.file[0].size,
            mime: data.file[0].type
        };

        const apiConfig = {
            uri: '/indices',
            request: {
                fileInfo: new Blob([JSON.stringify(fileInfo)], {type: 'application/json'}),
                file: data.file[0],
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }

        return await ApiService.POST(apiConfig);

    } catch (error) {
        console.error("Upload failed: ", error);
    }
}

export async function download(fid) {
    try {
        const apiConfig = {
            uri: `/indices/${fid}/data`,
            responseType: 'blob',
        };

        const response = await ApiService.GET_FULL(apiConfig);

        if (response && response.status === 200) {
            const blob = new Blob([response.data], {type: response.headers['content-type']});

            const contentDisposition = response.headers['content-disposition'];
            let fileName = 'downloaded_file'; // Default file name in case Content-Disposition header is missing or malformed

            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="?(.+?)"?$/);
                if (fileNameMatch && fileNameMatch.length === 2) {
                    fileName = decodeURIComponent(fileNameMatch[1])
                    fileName = fileName.replace(/_+(\.[^_.]+)?$/, '$1');
                }
            }

            // Create a link element to download the file
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();

            // Clean up by revoking the Object URL and removing the link element
            window.URL.revokeObjectURL(link.href);
            document.body.removeChild(link);

            Toaster.ok("File downloaded");
        }
    } catch (error) {
        console.error('Error downloading the file:', error);
        Toaster.error("Download failed");
    }
}

export async function search(term) {
    try {
        term = handleTerm(term);

        if (term === null || term === '' || (term.length === 1 && term === "."))
            return;

        const apiConfig = {
            uri: `/indices/${term}`,
            headers: {
                'Content-Type': 'application/json'
            },
        }

        return await ApiService.GET(apiConfig);
    } catch (error) {}
}

function handleTerm(term) {
    let array = term.split(" ");

    while (array[0] === "")
        array.shift();

    while (array[array.length - 1] === "")
        array.pop();

    return array.join(" ");
}
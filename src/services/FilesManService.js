import {ApiService} from "./ApiService";
import {Toaster} from "../components/Toaster";

export async function getFiles(page, size) {
    try {
        const apiConfig = {
            uri: '/indices',
            params: {
                page: page,
                size: size,
            }
        }

        return await ApiService.GET(apiConfig);
    } catch (error) {
        console.error(error);
    }
}

export async function getScheduled(page, size) {
    try {
        const apiConfig = {
            uri: '/indices/scheduled',
            params: {
                page: page,
                size: size,
            }
        }

        return await ApiService.GET(apiConfig);
    } catch (error) {
        console.error(error);
    }
}

export async function getIndexed(page, size) {
    try {
        const apiConfig = {
            uri: '/indices/indexed',
            params: {
                page: page,
                size: size,
            }
        }

        return await ApiService.GET(apiConfig);
    } catch (error) {
        console.error(error);
    }
}

export async function deleteFile(id) {
    try {
        const apiConfig = {
            uri: '/indices/' + id,
        }

        const response =  await ApiService.DELETE(apiConfig);

        if (response && response.status === 200)
            Toaster.info("File deleted");
    } catch (error) {
        console.error(error);
        Toaster.error("An error occurred while deleting the file");
    }
}
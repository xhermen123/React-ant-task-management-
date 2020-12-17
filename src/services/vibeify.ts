export interface UploadResponse {
    data: {
        url: string
    }
}

export default {
    upload(file: File): Promise<UploadResponse> {
        const url = `https://vibeify.io/api/venuegenie/files`;
        let data = new FormData();
        data.append('file', file)
        return fetch(url, {
            method: 'POST',
            body: data
        })
            .then(resp => resp.json())
            .then(payload => {
                if (payload.error) {
                    return Promise.reject(payload)
                }
                return Promise.resolve(payload)
            });
    }
}
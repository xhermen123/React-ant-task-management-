export interface QueryParam {
    key: string;
    value: string;
    [key: string]: string;
}

export const post = (url: string, data: any): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(payload => {
                if (payload.error)
                    return reject(payload)
                resolve(payload)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export const put = (url: string, data: any): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(payload => {
                if (payload.error)
                    return reject(payload)
                resolve(payload)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export interface ApiResponse {
    data: any
}

export const get = (url: string): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
            },
        })
            .then(resp => resp.json())
            .then(payload => {
                if (payload.error)
                    return reject(payload)
                resolve(payload)
            })
            .catch(err => {
                reject(err)
            })
    })

}

export const del = (url: string): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
            },
        })
            .then(resp => resp.json())
            .then(payload => {
                if (payload.error)
                    return reject(payload)
                resolve(payload)
            })
            .catch(err => {
                reject(err)
            })
    })

}

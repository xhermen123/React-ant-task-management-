const BASE_URL = 'https://graph.facebook.com'
import { get } from './base'

export interface ProfilePictureResponse {
    data: {
        url: string;
        height: number;
        width: number;
    }
}


export default {
    getProfileImage(username: string): Promise<ProfilePictureResponse> {
        return get(`${BASE_URL}/${username}/picture?width=140&height=110&redirect=false`)
    }
}

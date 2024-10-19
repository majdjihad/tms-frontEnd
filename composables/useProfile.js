import {$larafetch} from "~/utils/$larafetch";

export const useProfile = () => {
    async function getProfile(userIdentify) {
        const response = await $larafetch(`api/profile/${userIdentify}`, {
            method: 'get'
        })
        return response
    }
    async function editProfile(userIdentify, credentials) {
        const response = await $larafetch(`api/profile/${userIdentify}/edit`, {
            method: 'post',
            body: credentials,
        })
        return response
    }    async function resetPassword(userIdentify, credentials) {
        const response = await $larafetch(`api/profile/${userIdentify}/change-password`, {
            method: 'post',
            body: credentials,
        })
        return response
    }
    return {
        getProfile,
        editProfile,
        resetPassword
    }
}
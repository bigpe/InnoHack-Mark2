import axios from 'axios';

import { Credentials, SignInReturn } from 'types/api/auth';
import {
    CollectionType,
    CollectionItemList,
    NewCollection,
} from 'types/api/collectionType';

export const CollectionServices = {
    async getCollectionTypes() {
        return axios
            .get<CollectionType[]>('/api/collection/type/')
            .then((response) => response.data);
    },
    async getCollectionsList(id: string | undefined) {
        return axios
            .get<CollectionItemList[]>(`/api/collection/type/${id}/`)
            .then((response) => response.data);
    },
    async postCollection(data: NewCollection) {
        return axios
            .post<CollectionItemList[]>('/api/collection/snapshot/add/', data)
            .then((response) => response.data);
    },
};

export const AuthServices = {
    async signIn(creds: Credentials) {
        return axios
            .post<SignInReturn>('/api/account/sign/in/', creds)
            .then((response) => response.data);
    },
    async signOut() {
        return axios.get('/api/account/sign/out/');
    },
    async checkAuth() {
        return axios.get('/api/account/sign/');
    },
};

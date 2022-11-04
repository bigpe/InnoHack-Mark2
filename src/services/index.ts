import axios from 'axios';

import { Collection } from '../types/api/collection';

export const CollectionServices = {
    async getCountryList() {
        return axios
            .get<Collection[]>('/api/page')
            .then((response) => response.data);
    },
    async getCountry(id: string) {
        return axios
            .get<Collection>(`/api/page/info/${id}`)
            .then((response) => response.data);
    },
};

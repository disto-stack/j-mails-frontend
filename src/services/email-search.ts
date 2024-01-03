import axios from 'axios';
import { SearchResponse } from '../types/search-response';

export const EmailSearchService = {
	async searchByTerm(term: string) {
		return axios.post<SearchResponse>(
			'http://localhost:3000/api/v1/email/search',
			{
				term,
			}
		);
	},
};

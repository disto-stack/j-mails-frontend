import { SearchData } from './search-data';

export type SearchResponse = {
	code: number;
	message: string;
	data: SearchData;
};

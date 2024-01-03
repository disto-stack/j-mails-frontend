import { Email } from './email';

export type SearchData = {
	hits: {
		hits: {
			_source: Email;
		}[];
		total: number;
	};
	took: number;
};

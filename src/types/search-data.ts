import { Email } from './email';

export type SearchData = {
	hits: {
		hits: {
			_source: Email;
		}[];
		total: {
			value: number;
		};
	};
	took: number;
};

import { useState, useEffect, useReducer } from 'react';
import data from '../assets/mockUsers.json';
import { User } from '../models/User';


export type OrderBy = 'Asc' | 'Desc';
type SortBy = keyof User;

export type Pagination = {
	total: number;
	page: number;
	pageCount: number;
	perPage: number;
};

type ApiResponse = {
	data: User[];
	pagination: Pagination;
};

type MockApi = {
	apiResponse: ApiResponse;
	loading: boolean;
	dispatchFilter: (filter: string) => void;
	dispatchOrderBy: (orderBy: OrderBy) => void;
	dispatchSortBy: (sortBy: SortBy) => void;
	dispatchPage: (page: number) => void;
	dispatchLimit: (limit: number) => void;
};


enum UsersActionTypes {
	SET_FILTER = 'SET_FILTER',
	SET_ORDER_BY = 'SET_ORDER_BY',
	SET_SORT_BY = 'SET_SORT_BY',
	SET_PAGE = 'SET_PAGE',
	SET_LIMIT = 'SET_LIMIT',
}

type UsersAction =
	| { type: UsersActionTypes.SET_FILTER, payload: string }
	| { type: UsersActionTypes.SET_ORDER_BY, payload: OrderBy }
	| { type: UsersActionTypes.SET_SORT_BY, payload: SortBy }
	| { type: UsersActionTypes.SET_PAGE, payload: number }
	| { type: UsersActionTypes.SET_LIMIT, payload: number };

type UsersState = {
	filter: string;
	orderBy: OrderBy;
	sortBy: SortBy;
	offset: number;
	limit: number;
};


function usersReducer(state: UsersState, action: UsersAction): UsersState {
	switch (action.type) {
		case UsersActionTypes.SET_FILTER:
			return { ...state, filter: action.payload, offset: 1 };
		case UsersActionTypes.SET_ORDER_BY:
			return { ...state, orderBy: action.payload, offset: 1 };
		case UsersActionTypes.SET_SORT_BY:
			return { ...state, sortBy: action.payload, offset: 1 };
		case UsersActionTypes.SET_PAGE:
			return { ...state, offset: action.payload, };
		case UsersActionTypes.SET_LIMIT:
			return { ...state, limit: action.payload, offset: 1 };
		default:
			return state;
	}
}



const useMockApi = (
	initialFilter: string,
	initialOrderBy: OrderBy,
	initialSortBy: SortBy,
	initialOffset: number,
	initialLimit: number,
	delay: number = 1000
): MockApi => {
	const userData: User[] = data;
	const [loading, setLoading] = useState(false);

	const [{
		filter,
		orderBy,
		sortBy,
		offset,
		limit,
	}, dispatch] = useReducer(usersReducer, {
		filter: initialFilter,
		orderBy: initialOrderBy,
		sortBy: initialSortBy,
		offset: initialOffset,
		limit: initialLimit,

	});

	const [apiResponse, setApiResponse] = useState<ApiResponse>({
		data: [],
		pagination: {
			total: 0,
			page: 0,
			pageCount: 0,
			perPage: 0,
		},
	});

	useEffect(() => {

		setLoading(true);
		// Simulate API call with timeout
		const timeoutId = setTimeout(() => {
			// Apply sorting
			const sortedUsers = userData.toSorted((a, b) => {
				const aValue = a[sortBy];
				const bValue = b[sortBy];

				if (orderBy === 'Asc') {
					return aValue.localeCompare(bValue);
				} else {
					return bValue.localeCompare(aValue);
				}
			}).filter((user) => user.name.toLowerCase().includes(filter.toLowerCase()));

			// Apply pagination
			const startIndex = (offset - 1) * limit;
			const endIndex = startIndex + limit;
			const paginatedUsers = sortedUsers.slice(startIndex, endIndex);

			const pagination = {
				total: sortedUsers.length,
				page: offset,
				pageCount: Math.ceil(sortedUsers.length / limit),
				perPage: limit,
			}

			console.log(pagination)

			setLoading(false);
			setApiResponse({
				data: paginatedUsers,
				pagination
			});
		}, delay); // Simulate 500ms API delay

		return () => clearTimeout(timeoutId);
	}, [orderBy, sortBy, offset, limit, filter, userData, delay]);

	const dispatchFilter = (filter: string) => dispatch({ type: UsersActionTypes.SET_FILTER, payload: filter });
	const dispatchOrderBy = (orderBy: OrderBy) => dispatch({ type: UsersActionTypes.SET_ORDER_BY, payload: orderBy });
	const dispatchSortBy = (sortBy: SortBy) => dispatch({ type: UsersActionTypes.SET_SORT_BY, payload: sortBy });
	const dispatchPage = (page: number) => dispatch({ type: UsersActionTypes.SET_PAGE, payload: page });
	const dispatchLimit = (limit: number) => dispatch({ type: UsersActionTypes.SET_LIMIT, payload: limit });


	return {
		apiResponse,
		loading,
		dispatchFilter,
		dispatchOrderBy,
		dispatchSortBy,
		dispatchPage,
		dispatchLimit,
	};
};

export default useMockApi;
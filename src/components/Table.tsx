interface TableProps<T> {
	children: {
		header: React.ReactNode;
		row: (row: T, idx: number, rows: T[]) => React.ReactNode;
		pagination?: React.ReactNode;
	};
	data: T[];
	caption?: string;
}

const Table = <T,>({ children: { pagination, header, row }, caption, data }: TableProps<T>) => {

	return (
		<div className="relative">
			<div className="overflow-y-auto h-[415px]">
				<table className="w-full table-auto">
					{caption && <caption>{caption}</caption>}
					<thead>
						{header}
					</thead>
					<tbody className="divide-y divide-stone-100">
						{data.map((data, idx, rows) => row(data, idx, rows))}
					</tbody>
				</table>
			</div>
			{pagination && (
				<div className="absolute right-0 -bottom-16">
					{pagination}
				</div>
			)}
		</div>
);

}

export default Table;
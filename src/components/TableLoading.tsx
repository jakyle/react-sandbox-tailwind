const TableLoading = () => {

	const headers = [
		'name',
		'email',
		'phone'
	];

	return (
	<table className="h-[420px] w-[520px]">
		<caption>fetching users...</caption>
		<thead>
			<tr>
				{headers.map((header) => (
					<th key={Math.random()} className="bg-white text-stone-700">{header}</th>
				))}
			</tr>
		</thead>
		<tbody className="divide-y divide-stone-100">
			{Array.from({ length: 9 }, (_, idx) => idx).map((_, idx) => (
				<tr key={idx}>
					{Array.from({length: 3}, (_, idx) => idx).map(() => (
						<td key={Math.random()} className="animate-pulse p-2 m-2 bg-stone-400 text-stone-100 h-[40.3px]" />
					))}
				</tr>
			))}
		</tbody>
	</table>
	);
}

export default TableLoading;
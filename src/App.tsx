import { ChangeEvent, useEffect, useState } from "react";
import { Pagination } from "./components/Pagination";
import Table from "./components/Table"
import TableLoading from "./components/TableLoading";
import useMockApi from "./hooks/useMockApi";
import { useDebounce } from "./hooks/useDebounce";

function App() {

  const [inputFilter, setInputFilter] = useState('');
  const filter =  useDebounce(inputFilter, 500);

  const { 
    apiResponse: { data: users, pagination }, 
    loading,
    dispatchFilter, 
    dispatchOrderBy, 
    dispatchSortBy, 
    dispatchPage, 
    dispatchLimit
  } = useMockApi(filter, 'Asc', 'name', 0, 50, 50);

  useEffect(() => {
    dispatchFilter(filter);
  }, [filter])

  const handleInputChange = (event: ChangeEvent) => {
    setInputFilter((event.target as HTMLInputElement).value.trim().toLowerCase());
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-stone-200">
      <div className="flex gap-x-2">
        <label htmlFor="filter">Filter</label>
        <input id="filter" onChange={handleInputChange} />
      </div>

      {loading && <TableLoading />}
      {!loading && <Table data={users} caption="users">
        {{
          header: (
            <tr>
              <th className="sticky top-0 bg-white z-10 text-stone-700">name</th>
              <th className="sticky top-0 bg-white z-10 text-stone-700">email</th>
              <th className="sticky top-0 bg-white z-10 text-stone-700">phone</th>
            </tr>
          ),
          pagination: (
            <Pagination 
              currentPage={pagination.page}
              totalPages={pagination.pageCount}
              onPageChange={dispatchPage}
            />
          ),
          row: (data, idx) => (
            <tr key={idx}>
              <td className="p-2 m-2 bg-stone-500 text-stone-100">{data.name}</td>
              <td className="p-2 m-2 bg-stone-500 text-stone-100">{data.email}</td>
              <td className="p-2 m-2 bg-stone-500 text-stone-100">{data.phone}</td>
            </tr>
          ),
        }}
      </Table> }
    </div>
  )
}

export default App

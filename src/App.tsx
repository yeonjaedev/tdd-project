import {useEffect, useState} from 'react';
import './App.css';
import jsonData from '../public/data.json';
import {Employee} from './types/employee';
import Pagination from './components/Pagination';

const App = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [nowPage, setNowPage] = useState<number>(1);
    const itemPerPages = 3;
    useEffect(() => {
        const end = itemPerPages * nowPage;
        setEmployees(jsonData.employees.slice(end - itemPerPages, end));
    }, [nowPage]);
    return (
        <>
            <div style={{height: 130, width: 500}}>
                {employees.map(employee => (
                    <li key={employee.id}>
                        {employee.name} / {employee.email}
                    </li>
                ))}
            </div>
            <Pagination totalItems={jsonData.employees.length} itemsPerPages={itemPerPages} setNowPage={setNowPage} nowPage={nowPage} />
        </>
    );
};

export default App;

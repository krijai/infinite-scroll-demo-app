import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-bootstrap/Pagination";

export default function PaginationTable(props) {
    const [state, setState] = useState({
        data: [],
        limit: 10,
        activePage: 1
    });
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        (async () => {
            const response = await axios.get('http://localhost:5001/get-data-pagination', {
                params: {
                    startIndex: 0,
                    stopIndex: 10
                }
            });
            setTableData(response.data.data)
        })();
    }, [state.limit])

    const handlePageChange = (pageNumber) => {
        (async () => {
            let response = await axios.get('http://localhost:5001/get-data-pagination', {
                params: {
                    startIndex: pageNumber == 1 ? 0 : ((pageNumber * 10) - 10),
                    stopIndex: pageNumber * 10
                }
            });
            if (response.data.data) {
                setState((prev) => ({ ...prev, activePage: pageNumber }));
                setTableData(response.data.data)
            }
        })()
    };


    return (
        <div style={{ width: "100%" }}>
            <h2 className="mt-5 px-4">Table Data with Pagination</h2>

            <ul className="list-group p-4">
                {tableData && tableData.map((item, index) => {
                    return (
                        <li key={index} className="list-group-item" data-testid={`table-data-${index}`}>
                            <span className="font-weight-bold pr-2">{item.packetName}.</span>{" "}
                            {item.timestamp}
                        </li>
                    );
                })
                }
            </ul>

            <Pagination className="px-4">
                {tableData.map((_, index) => {
                    return (
                        <Pagination.Item
                            onClick={() => handlePageChange((index + 1))}
                            key={index + 1}
                            active={index + 1 === state.activePage}
                            data-testid={`page-number-${index}`}
                        >
                            {index + 1}
                        </Pagination.Item>
                    );
                })}
            </Pagination>
        </div>
    );
}

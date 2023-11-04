import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import PacketTable from "./PacketTable";
import arrData from './usb_data.json';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import questions from './questions.json';
import Accordion from './Accordion';
import "react-virtualized/styles.css";
import PaginationTable from "./PaginationTable";
import FixedSizePacketTable from "./FixedSizePacketTable";

export default function App() {
  const [pageCount, setPageCount] = useState(1);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    (async () => {
      // Generate packetData in usb_data.json
      if (!tableData) {
        await axios.get('http://localhost:5001');
      }
      // Fetch initial table data
      const response = await axios.get('http://localhost:5001/get-data', {
        params: {
          stopIndex: 10
        }
      });
      setTableData(response.data.data)

      setPageCount(pageCount => pageCount + 1);
    })();
  }, []);

  function isRowLoaded({ index }) {
    console.log("isRowLoaded Hitttttt", !!tableData[index]);
    return !!tableData[index];
  }

  // fetch additional table data on load more request
  const loadMoreRows = async ({ startIndex, stopIndex }) => {
    console.log("loadMoreRows Hitttttt", startIndex, stopIndex)
    if (stopIndex === startIndex + 14) {
      setIsNextPageLoading(true)
      // setting timeout inorder to show the async loading in UI
      const timer = setTimeout(async() => {
        let response = await axios.get('http://localhost:5001/get-data', {
          params: {
            stopIndex: stopIndex
          }
        });
        console.log("response.data.data--------", response.data.data)
        setTableData(response.data.data);
        setIsNextPageLoading(false)
      }, 2000)

    }
  }

  if (!tableData.length) return <span>Loading initial Table Data</span>;

  return (
    <div className="container">
      <BrowserRouter>
        <div className="heading">
          <h1>React Virtualized Infinite Scroll Demo</h1>
          <div><Link to="/">Home</Link></div>
          <div><Link to="/questions">Questions</Link></div>
          <div><Link to="/pagination">Pagination</Link></div>
          <div><Link to="/fixed-size-packet-table">Fixed Size Packet Table</Link></div>
        </div>

        <Routes>
          <Route path="/" element={<div className="repositoriesWrapper">
            <PacketTable isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} repositories={tableData} />
            {isNextPageLoading && <span>loading more table data..</span>}
          </div>} />
          <Route path="/questions" element={<><p className="paragraph">Questions and Answers</p> <Accordion questions={questions.questions} /></>} />
          <Route path="/pagination" element={<PaginationTable isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} repositories={tableData} />} />
          <Route path="/fixed-size-packet-table" element={<FixedSizePacketTable data={arrData.table}/>} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

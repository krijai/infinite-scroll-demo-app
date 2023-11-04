import React, { useState } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import {
    Table,
    Column,
} from "react-virtualized";

function FixedSizePacketTable({ data, itemSize }) {
    const [visibleData, setVisibleData] = useState([]);
    const [visibleStartIndex, setVisibleStartIndex] = useState(0);
    const [visibleEndIndex, setVisibleEndIndex] = useState(0);
    const [verticalScrollValue, setVerticalScrollValue] = useState(0);
    const listRef = React.createRef();
    const inputRef = React.createRef();

    const handleScroll = ({ scrollOffset, scrollUpdateWasRequested }) => {
        // Calculate the start and end indices of the visible items based on the scroll offset and height
        const startIndex = Math.max(0, Math.floor(scrollOffset / 35));
        const endIndex = Math.min(data.length, startIndex + Math.ceil(500 / 35) + 1);

        setVisibleStartIndex(scrollOffset == 0 ? startIndex : startIndex + 2)
        setVisibleEndIndex(scrollOffset == 0 ? endIndex : endIndex - 1)
        setVerticalScrollValue(scrollOffset)
    };

    const Row = ({ index, style }) => {
        return (
            <tr className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
                <td>
                    {data && data[index]['Index']}
                </td>
                <td>
                    {data && data[index]['packetName']}
                </td>
                <td>
                    {data && data[index]['header']}
                </td>
                <td>
                    {data && data[index]['payload']}
                </td>
                <td>
                    {data && data[index]['error']}
                </td>
                <td>
                    {data && data[index]['rawData']}
                </td>
                <td>
                    {data && data[index]['timestamp']}
                </td>
            </tr>
        )
    };

    const scrollHandlerLastRow = (e) => {
        e.preventDefault();
        listRef.current.scrollToItem(data.length, 'center');
    }

    const scrollHandlerTopRow = (e) => {
        e.preventDefault();
        listRef.current.scrollToItem(0, 'center');
    }

    const scrollHandlerInput = (e) => {
        e.preventDefault();
        listRef.current.scrollToItem(inputRef.current.value, 'center');
    }

    return (
        <>
            <div className='summaryItemsWrapper'>
                <div className="filterItemsWrapper">
                    <p><strong><i>Filter Options</i></strong></p>
                    <input type="number" placeholder={"Enter Row Number"} ref={inputRef} />
                    <button onClick={scrollHandlerInput} data-testid="submit-btn">Submit</button>
                    <div className='btnsWrapper'>
                        <button className="lastRowBtn" onClick={scrollHandlerLastRow} data-testid="scroll-to-last-row">
                            Scroll to last row
                        </button>
                        <button className="lastRowBtn" onClick={scrollHandlerTopRow} data-testid="scroll-to-top-row">
                            Scroll to Top row
                        </button>
                    </div>
                </div>
                <div className='summaryWrapper'>
                    <p><strong><i>Summary</i></strong></p>
                    <h4 data-testid={`total-no-of-rows`}>Total No of Rows: {data.length}</h4>
                    <p data-testid={`starting-index`}>Visibile Row Starting Index: {visibleStartIndex}</p>
                    <p data-testid={`ending-index`}>Visibile Row Ending Index: {visibleEndIndex}</p>
                    <p data-testid={`vertical-scroll-value`}>Vertical Scroll Value: {verticalScrollValue}</p>
                </div>
            </div>
            <table>
                <tr className="headerRow">
                    <th>Index</th>
                    <th>PacketName</th>
                    <th>Header</th>
                    <th>Payload</th>
                    <th>Error</th>
                    <th>RawData</th>
                    <th>TimeStamp</th>
                </tr>
                <FixedSizeList
                    className="List"
                    height={500}
                    itemCount={data.length}
                    itemSize={35}
                    width={800}
                    onScroll={handleScroll}
                    ref={listRef}
                >
                    {Row}
                </FixedSizeList>
            </table >
        </>
    );
}

export default FixedSizePacketTable;
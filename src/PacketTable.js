import React, { useEffect, useState } from 'react'
import {
    AutoSizer,
    InfiniteLoader,
    List,
    WindowScroller,
    Table,
    Column,
    SortDirection,
    SortIndicator
} from "react-virtualized";

function PacketTable(props) {
    const sortBy = 'index';
    const [sortedDirection, setSortedDirection] = useState(SortDirection.ASC);
    const [sortedData, setSortedData] = useState(props.repositories)

    useEffect(() => {
        setSortedData(props.repositories)
    }, [props.repositories])

    // Function to sort by ascending or descending
    const sort = ({ sortBy }) => {
        if (sortedDirection === "ASC") {
            setSortedDirection("DSC")
        } else {
            setSortedDirection("ASC")
        }
        const sortedList = sortList({ sortBy, sortedDirection });
        setSortedData(sortedList)
    }

    const sortList = ({ sortBy }) => {
        let arrangedData = props.repositories.sort((a, b) => {
            if (sortedDirection === "ASC") {
                if (a[`${sortBy}`] < b[`${sortBy}`]) {
                    return -1;
                } else if (a[`${sortBy}`] > b[`${sortBy}`]) {
                    return 1;
                } else {
                    return 0;
                }
            }

            if (sortedDirection === "DSC") {
                if (a[`${sortBy}`] < b[`${sortBy}`]) {
                    return 1;
                } else if (a[`${sortBy}`] > b[`${sortBy}`]) {
                    return -1;
                } else {
                    return 0;
                }
            }

        })

        return arrangedData;
    }

    // Column header renderer
    const headerRenderer = ({ dataKey, sortDirection }) => {
        return (
            <div>
                {dataKey}
                {<SortIndicator sortDirection={sortDirection} />}
            </div>
        );
    }

    return (
        <AutoSizer disableHeight={true}>
            {({ width }) => (
                <WindowScroller>
                    {({ height, scrollTop }) => (
                        <InfiniteLoader
                            isRowLoaded={props.isRowLoaded}
                            loadMoreRows={props.loadMoreRows}
                            rowCount={1000}
                        >
                            {({ onRowsRendered, registerChild }) => (
                                <Table
                                    autoHeight
                                    onRowsRendered={onRowsRendered}
                                    ref={registerChild}
                                    width={width}
                                    headerHeight={20}
                                    height={height}
                                    scrollTop={scrollTop}
                                    rowCount={sortedData.length}
                                    rowHeight={20}
                                    rowGetter={({ index }) => sortedData[index]}
                                    gridStyle={{ outline: "none" }}
                                    sort={sort}
                                    sortBy={sortBy}
                                    sortDirection={sortedDirection}
                                >
                                    <Column label="Index" dataKey="Index" width={200} headerRenderer={headerRenderer} />
                                    <Column label="Packet Name" dataKey="packetName" width={200} headerRenderer={headerRenderer} />
                                    <Column label="Header" dataKey="header" width={200} headerRenderer={headerRenderer} />
                                    <Column label="Payload" dataKey="payload" width={200} headerRenderer={headerRenderer} />
                                    <Column label="Error" dataKey="error" width={200} headerRenderer={headerRenderer} />
                                    <Column label="Raw Data" dataKey="rawData" width={200} headerRenderer={headerRenderer} />
                                    <Column label="TimeStamp" dataKey="timestamp" width={200} headerRenderer={headerRenderer} />
                                </Table>
                            )}
                        </InfiniteLoader>
                    )}
                </WindowScroller>
            )}
        </AutoSizer>
    )
}

export default PacketTable
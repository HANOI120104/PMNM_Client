/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';

interface TableProps {
    headers: string[];
    rows: React.ReactNode[][];
}

const Table: React.FC<TableProps> = ({ headers, rows }) => {
    return (
        <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-200">
                <tr>
                    {headers.map((header, index) => (
                        <th key={index} className="p-2 border border-gray-300">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="text-center">
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="p-2 border border-gray-300">
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;

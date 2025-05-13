import { AgGridReact } from 'ag-grid-react';
import { FC, useMemo } from 'react';
import { Guess } from '../types';
import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  themeAlpine,
} from 'ag-grid-community';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

interface GuessTableProps {
  guesses: Guess[];
  isResultsTable?: boolean;
}
export const GuessTableAggrid: FC<GuessTableProps> = ({
  guesses,
  isResultsTable,
}) => {
  const rowData = useMemo(() => {
    if (guesses) return guesses;
    return [];
  }, []);

  const sharedColDefs: ColDef<Guess>[] = [
    {
      field: 'name',
      flex: 2,
      minWidth: 150,
      sortable: true,
      filter: true,
      cellClass: 'left-align',
    },
    {
      field: 'guessedTimeInMs',
      headerName: 'Guess',
      sortable: true,
      flex: 1,
      minWidth: 120,
      filter: 'agNumberColumnFilter',
      valueFormatter: (params: { value: number }) => {
        const totalMs = params.value;
        const minutes = Math.floor(totalMs / 60000);
        const seconds = Math.floor((totalMs % 60000) / 1000);
        const milliseconds = totalMs % 1000;

        const paddedSeconds = seconds.toString().padStart(2, '0');
        const paddedMilliseconds = milliseconds.toString().padStart(3, '0');

        return `${minutes}:${paddedSeconds}.${paddedMilliseconds}`;
      },
      cellClass: 'left-align',
    },
    {
      field: 'createdAt',
      headerName: 'Submitted Date',
      sortable: true,
      flex: 1,
      minWidth: 200,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString('en-SG', {
          timeZone: 'Asia/Singapore',
          dateStyle: 'medium',
          timeStyle: 'short',
        });
      },
      cellClass: 'left-align',
    },
  ];

  const guessesTableCols: ColDef<Guess>[] = useMemo(() => sharedColDefs, []);

  const resultsTableCols: ColDef<Guess>[] = useMemo(
    () => [
      sharedColDefs[0],
      sharedColDefs[1],
      {
        field: 'diff',
        headerName: 'Difference',
        sortable: true,
        minWidth: 120,
        cellClass: 'left-align',
        valueFormatter: (params: { value: number }) => {
          const totalMs = params.value;
          const minutes = Math.floor(totalMs / 60000);
          const seconds = Math.floor((totalMs % 60000) / 1000);
          const milliseconds = totalMs % 1000;

          const paddedSeconds = seconds.toString().padStart(2, '0');
          const paddedMilliseconds = milliseconds.toString().padStart(3, '0');

          return `${minutes}:${paddedSeconds}.${paddedMilliseconds}`;
        },
      },
      sharedColDefs[2],
    ],

    [],
  );

  return (
    <div
      style={{
        width: 'calc(100vw - 2 * var(--container-padding))',
        height: 'calc(100vh - 7 * var(--container-padding))',
      }}
    >
      <AgGridReact<Guess>
        theme={themeAlpine}
        domLayout="autoHeight"
        rowData={rowData}
        columnDefs={isResultsTable ? resultsTableCols : guessesTableCols}
      />
    </div>
  );
};

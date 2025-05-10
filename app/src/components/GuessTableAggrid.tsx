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
export const GuessTableAggrid: FC<GuessTableProps> = ({ guesses }) => {
  const rowData = useMemo(() => {
    if (guesses) return guesses;
    return [];
  }, []);

  const colDef: ColDef<Guess>[] = useMemo(() => {
    return [
      {
        field: 'name',
        minWidth: 100,
        width: 150,
        maxWidth: 250,
        sortable: true,
        filter: true,
      },
      {
        field: 'guessedTimeInMs',
        headerName: 'Guess',
        sortable: true,
        flex: 1,
        minWidth: 100,
        maxWidth: 250,
        filter: 'agNumberColumnFilter',
        valueFormatter: (params: { value: number }) => {
          const totalMs = params.value;
          const minutes = Math.floor(totalMs / 60000);
          const seconds = Math.floor((totalMs % 60000) / 1000);
          const milliseconds = totalMs % 1000;

          // Format to always show 2-digit seconds and 3-digit ms
          const paddedSeconds = seconds.toString().padStart(2, '0');
          const paddedMilliseconds = milliseconds.toString().padStart(3, '0');

          return `${minutes}:${paddedSeconds}.${paddedMilliseconds}`;
        },
      },
      {
        field: 'createdAt',
        headerName: 'Submitted Date',
        sortable: true,
        valueFormatter: (params) => {
          const date = new Date(params.value);
          console.log(date);
          return date.toLocaleString('en-SG', {
            timeZone: 'Asia/Singapore',
            dateStyle: 'medium',
            timeStyle: 'short',
          });
        },
        minWidth: 180,
      },
    ];
  }, []);

  return (
    <div
      style={{
        width: 'calc(100vw - 4 * var(--container-padding))',
        height: 'calc(100vh - 7 * var(--container-padding))',
      }}
    >
      <AgGridReact<Guess>
        theme={themeAlpine}
        rowData={rowData}
        columnDefs={colDef}
      />
    </div>
  );
};

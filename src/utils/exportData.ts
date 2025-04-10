
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

type ExportFormat = 'csv' | 'excel' | 'json';

interface ExportOptions {
  fileName: string;
  format: ExportFormat;
  sheetName?: string; // For Excel exports
}

/**
 * Export data to various formats (CSV, Excel, JSON)
 * @param data The data to export
 * @param options Export options including filename and format
 */
export const exportData = (data: any[], options: ExportOptions): void => {
  const { fileName, format, sheetName = 'Data' } = options;
  
  if (!data || data.length === 0) {
    console.error('No data to export');
    return;
  }

  try {
    switch (format) {
      case 'csv':
        exportToCSV(data, fileName);
        break;
      case 'excel':
        exportToExcel(data, fileName, sheetName);
        break;
      case 'json':
        exportToJSON(data, fileName);
        break;
      default:
        console.error('Unsupported export format');
    }
  } catch (error) {
    console.error('Error exporting data:', error);
  }
};

/**
 * Export data to CSV format
 */
const exportToCSV = (data: any[], fileName: string): void => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${fileName}.csv`);
};

/**
 * Export data to Excel format
 */
const exportToExcel = (data: any[], fileName: string, sheetName: string): void => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
  // Generate Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${fileName}.xlsx`);
};

/**
 * Export data to JSON format
 */
const exportToJSON = (data: any[], fileName: string): void => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  saveAs(blob, `${fileName}.json`);
};

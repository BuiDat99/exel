import React from "react";
import { Button } from "react-bootstrap";
import FileSaver from "file-saver";
import XLSX from "xlsx";

const ExportCSV = ({ csvData, fileName, wscols }) => {
  // ******** XLSX with object key as header *************
  // const fileType =
  //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  // const fileExtension = ".xlsx";

  // const exportToCSV = (csvData, fileName) => {
  //   const ws = XLSX.utils.json_to_sheet(csvData);
  //   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //   const data = new Blob([excelBuffer], { type: fileType });
  //   FileSaver.saveAs(data, fileName + fileExtension);
  // };

  // ******** XLSX with new header *************
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xls";

  const Heading = [
    {
      code: "STT",
      type: "Loại giao dịch",
      from: "Tài khoản nguồn",
      BankNumber: "Tài khoản thụ hưởng",
      AccountName: "Tên người thụ hưởng",
      ResonanceCode: "Mã chi nhánh Ngân hàng thụ hưởng",
      total_amount: "Số tiền",
      description: "Diễn giải"
    }
  ];

  const headerParams = [
    "code",
    "type",
    "from",
    "BankNumber",
    "AccountName",
    "ResonanceCode",
    "total_amount",
    "description"
  ];

  const exportToCSV = (csvData, fileName, wscols) => {
    const ws = XLSX.utils.json_to_sheet(Heading, {
      header: headerParams,
      skipHeader: true,
      origin: 0 //ok
    });
    ws["!cols"] = wscols;
    XLSX.utils.sheet_add_json(ws, csvData, {
      header: headerParams,
      skipHeader: true,
      origin: -1 //ok
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xls", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button
      variant="warning"
      onClick={(e) => exportToCSV(csvData, fileName, wscols)}
    >
      Export XLSX
    </Button>
  );
};

export default ExportCSV;

// This component is a presentational component which takes the data to download and file name as props. The exportToCSV method is invoked when the export button is clicked on line 20.

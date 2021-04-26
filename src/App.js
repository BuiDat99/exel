import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import ExportCSV from "./components/ExportCSV";
import axios from "axios";
import moment from "moment";
import "antd/dist/antd.css"
import ExcelPage from "./components/excelPage"
// generate customer objects

const App = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .post(
        "https://us-central1-autofarmer-net-9f4b8.cloudfunctions.net/getLikeSubMoneyUser",
        {
          data:
            '{"limit":10000,"page":1,"status":"Active","isLikeSub":true,"time":1618704000000,"timeEnd":1619049600000,"secretkey":"Congaubeo@123"}'
        }
      )
      .then(function (response) {
        const results = response.data.result.data;
        const accountActives = results.filter(
          (result) =>
            result.AccountName !== "" &&
            result.BankNumber !== "" &&
            result.total_amount > 50000
        );

        const mappingData = accountActives.map((accountActive, index) => {
          const withinMSB = "1. Chuyển khoản nội bộ MSB";
          const interBank = "2. Chuyển khoản liên ngân hàng";
          const typeBank =
            accountActive.ResonanceCode === 79302001 ? withinMSB : interBank;
          // }
          return {
            code: index + 1,
            type: typeBank,
            from: "03501017932577",
            AccountName: accountActive.AccountName,
            BankNumber: accountActive.BankNumber,
            ResonanceCode: accountActive.ResonanceCode,
            total_amount: accountActive.total_amount,
            description: `autofarmer thanh toan ngay ${moment().format(
              "DD/MM/YYYY"
            )}`
          };
        });

        setCustomers(mappingData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const mappingData = (customer) => {
    const wscols = [
      {
        wch: Math.max(
          customers.map((customer) => customer.code.toString().length)
        )
      },
      {
        wch: Math.max(...customers.map((customer) => customer.type.length))
      },
      { wch: Math.max(...customers.map((customer) => customer.from.length)) },
      {
        wch: Math.max(
          ...customers.map((customer) => customer.AccountName && customer.AccountName.length)
        )
      },
      {
        wch: Math.max(
          ...customers.map((customer) => customer.BankNumber && customer.BankNumber.length)
        )
      },
      {
        wch: Math.max(
          ...customers.map((customer) => customer.ResonanceCode && customer.ResonanceCode.length)
        )
      },
      {
        wch: Math.max(
          ...customers.map(
            (customer) => customer.total_amount.toString().length
          )
        )
      },
      {
        wch: Math.max(
          ...customers.map((customer) => customer.description.length)
        )
      }
    ];
    return wscols;
  };

  return (
    <div className="App">
      <Header className="header" topicTitle="Autofarmer " />
      <div className="row">
        <div className="col-md-4 center">
          <ExportCSV
            csvData={customers}
            fileName="Autofarmer_CK-NgayConThieu"
            wscols={customers.length > 0 && mappingData(customers)}
          />
          <ExcelPage />
        </div>
      </div>
    </div>
  );
};

export default App;


import React from "react";
import Header from "../components/Header";
import SankeyDiagram from "../components/SankeyDiagram";
import { useSelector } from "react-redux";
import UpdateData from "./UpdateSalaryAndExpenditure";
import { Box } from "@mui/material";
import { transformDataForSankey } from "../utils";

const SankeySalary = () => {
  const data = useSelector((state) => state.chartData);
  const loading = useSelector((state) => state.chartData.loading);

  return (
    <>
      {loading || data.inflows.length<1? (
        <div>loading..</div>
      ) : (
        <>
          <Header title={'SalaryExpenditure'} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
              margin: "0px 0px",
            }}
          >
            <SankeyDiagram
              data={transformDataForSankey(data)}
              nodePadding={80}
              nodeColor={"#ff7043"}
              linkColor={"rgba(255, 112, 67, 0.5)"}
              labelColor={"#3e2723"}
            />
          </Box>
          <UpdateData />
        </>
      )}
    </>
  );
};

export default SankeySalary;

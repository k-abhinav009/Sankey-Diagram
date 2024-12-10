import React from "react";
import Header from "../components/Header";
import SankeyDiagram from "../components/SankeyDiagram";
import { useSelector } from "react-redux";
import UpdateData from "./UpdateSalaryAndExpenditure";
import { Box, Button } from "@mui/material";
import { transformDataForSankey } from "../utils";
import { useTranslation } from "react-i18next";

const SankeySalary = () => {
  const data = useSelector((state) => state.chartData);
  const loading = useSelector((state) => state.chartData.loading);

  const handleRetry = () => {
    window.location.reload(); 
  };
  const { t } = useTranslation();

  return (
    <>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>{t("loading")}</p>
        </div>
      ) : data.inflows.length < 1 && data.outflows.length < 1 ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>{t("noData")};</p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRetry}
            style={{ marginTop: "10px" }}
          >
            {t("retry")}
          </Button>
        </div>
      ) : (
        <>
          <Header title="SalaryExpenditure" />
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

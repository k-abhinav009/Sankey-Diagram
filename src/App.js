import './App.css';
import React from "react";
import SankeySalary from './layouts/SalaryAndExpenditure';
import { fetchSankeyData } from "./actions"
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  dispatch(fetchSankeyData());
  
  return (
    <>
    <div className="App">
     <SankeySalary/>
  </div>
    </>
  );
};

export default App;
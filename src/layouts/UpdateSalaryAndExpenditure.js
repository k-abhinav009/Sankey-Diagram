import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import DialogBox from "../components/DialogBox";
import { useSelector, useDispatch } from "react-redux";
import { addChartData, deleteChartData, editChartData } from "../actions";
import { useTranslation } from "react-i18next";

const UpdateData = () => {
  const [data, setData] = useState({
    inflows: [],
    outflows: [],
  });
  const chartData = useSelector((state) => state.chartData);
  useEffect(() => {
    setData(chartData);
  }, [chartData]);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState(null);
  const [showAddOptions, setShowAddOptions] = useState(false);

  // Open Dialog
  const openDialog = (type, category, item = null, parent = null) => {
    setDialogProps({
      type,
      category, // inflows or outflows
      item,
      parent,
      onSubmit: handleDialogSubmit,
    });
    setIsDialogOpen(true);
  };

  // Close Dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
    setShowAddOptions(false); // Reset add options when closing dialog
  };

  // Handle Add/Edit/Delete
  const handleDialogSubmit = (type, newItem, category, parent) => {
    const updatedData = { ...data };
  
    if (type === "add" || type === "edit") {
      if (category === "outflows") {
        // Calculate total current outflows and inflows
        const totalOutflows = updatedData.outflows.reduce((sum, outflow) => sum + outflow.value, 0);
        const inflowTotal = updatedData.inflows.reduce((sum, inflow) => sum + inflow.value, 0);
  
        let newOutflowsSum = totalOutflows;
  
        // Calculate new total outflows based on type
        if (type === "add") {
          newOutflowsSum += newItem.value;
        } else if (type === "edit") {
          // Determine the previous value of the outflow being edited
          const oldOutflow = parent
            ? parent.children.find((child) => child.id === newItem.id)
            : updatedData.outflows.find((outflow) => outflow.id === newItem.id);
  
          const oldValue = oldOutflow ? oldOutflow.value : 0;
          newOutflowsSum = totalOutflows - oldValue + newItem.value;
        }
  
        // Check if new total outflows exceed total inflows
        if (newOutflowsSum > inflowTotal) {
          alert("Total outflows cannot exceed total inflows!");
          return; // Prevent the update
        }
  
        // Validation: Ensure child outflows do not exceed the parent outflow
        if (parent) {
          // Recalculate child outflows sum, including the new/edited value
          const childOutflowsSum = parent.children
            ? parent.children.reduce((sum, child) => {
                if (child.id === newItem.id) {
                  return sum + newItem.value; // Replace old value with the new value for the current child
                }
                return sum + child.value;
              }, 0)
            : newItem.value;
  
          // Validate the sum of children does not exceed the parent value
          const parentOutflow = updatedData.outflows.find((outflow) => outflow.id === parent.id);
          const parentValue = parentOutflow ? parentOutflow.value : parent.value;
  
          // Ensure that the child outflows sum does not exceed the parent outflow value
          if (childOutflowsSum > parentValue) {
            alert("Child outflows cannot exceed the value of their parent outflow!");
            return; // Prevent the update
          }
        }
      }
    }
  
    // Proceed with normal operations
    if (type === "add" || type === "edit") {
      if (category === "outflows") {
        if (parent) {
          // Add/Edit child in the parent outflow
          const parentIndex = updatedData.outflows.findIndex((outflow) => outflow.id === parent.id);
          if (type === "add") {
            const dispatchItem = {
              newItem,
              addType: "outflows",
              addparent: parentIndex,
            };
            dispatch(addChartData(dispatchItem));
          } else {
            const dispatchItem = {
              editItem: newItem,
              editParent: parentIndex,
              type: "outflows",
            };
            dispatch(editChartData(dispatchItem));
          }
        } else {
          // Add/Edit parent-level outflows
          if (type === "add") {
            const dispatchItem = {
              newItem,
              addType: "outflows",
              addparent: parent,
            };
            dispatch(addChartData(dispatchItem));
          } else {
            const dispatchItem = {
              editItem: newItem,
              editParent: parent,
              type: "outflows",
            };
            dispatch(editChartData(dispatchItem));
          }
        }
      } else if (category === "inflows") {
        // Add/Edit inflows
        if (type === "add") {
          const dispatchItem = {
            newItem,
            addType: "inflows",
            parent,
          };
          dispatch(addChartData(dispatchItem));
        } else {
          const dispatchItem = {
            editItem: newItem,
            parent,
            type: "inflows",
          };
          dispatch(editChartData(dispatchItem));
        }
      }
    } else if (type === "delete") {
      if (category === "outflows") {
        if (parent) {
          // Delete child
          const parentIndex = updatedData.outflows.findIndex((outflow) => outflow.id === parent.id);
          const dispatchItem = {
            id: newItem.id,
            deleteParent: parentIndex,
            deleteType: "outflows",
          };
          dispatch(deleteChartData(dispatchItem));
        } else {
          // Delete parent-level outflow
          const dispatchItem = {
            id: newItem.id,
            parent,
            deleteType: "outflows",
          };
          dispatch(deleteChartData(dispatchItem));
        }
      } else if (category === "inflows") {
        // Delete inflows
        const dispatchItem = {
          id: newItem.id,
          parent,
          deleteType: "inflows",
        };
        dispatch(deleteChartData(dispatchItem));
      }
    }
  
    setData(updatedData);
    closeDialog();
  };
  
  
  
  return (
    <div style={{ padding: "10px" }}>
      <h3>{t('UpdateInflowOutflow')}</h3>

      {/* Add Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowAddOptions(!showAddOptions)} // Toggle Add Options
        style={{ marginBottom: "10px" }}
      >
       {t('Add')}
      </Button>

      {showAddOptions && (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => openDialog("add", "inflows")}
            style={{ marginBottom: "10px", marginRight: "5px" }}
          >
             {t('AddInflow')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => openDialog("add", "outflows")}
            style={{ marginBottom: "10px", marginLeft: "5px" }}
          >
            {t('AddOutflow')}
          </Button>
        </div>
      )}

      {/* Grid Layout for Inflows and Outflows */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        {/* Inflows */}
        <div>
          <h3>{t('Inflows')}</h3>
          {data.inflows.map((inflow) => (
            <div key={inflow.id} style={{ marginBottom: "10px" }}>
              <span>
                {inflow.name}: {inflow.value} ({inflow.details})
              </span>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => openDialog("edit", "inflows", inflow)}
                style={{ marginLeft: "10px" }}
              >
                  {t('edit')}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => openDialog("delete", "inflows", inflow)}
                style={{ marginLeft: "10px" }}
              >
               {t('Delete')}
              </Button>
            </div>
          ))}
        </div>

        {/* Outflows */}
        <div>
          <h3>{t('Outflows')}</h3>
          {data.outflows.map((parent) => (
            <div key={parent.id} style={{ marginBottom: "20px" }}>
              <span>
                <strong>{parent.name}</strong>: {parent.value}
              </span>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => openDialog("edit", "outflows", parent)}
                style={{ marginLeft: "10px" }}
              >
                 {t('edit')}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => openDialog("delete", "outflows", parent)}
                style={{ marginLeft: "10px" }}
              >
                 {t('delete')}
              </Button>

              {/* Child Outflows */}
              <div style={{ paddingLeft: "20px", marginTop: "10px" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => openDialog("add", "outflows", null, parent)}
                >
                 {t('AddOutflowkps')}
                </Button>
                {parent.children &&
                  parent.children.map((child) => (
                    <div key={child.id} style={{ marginTop: "10px" }}>
                      <span>
                        {child.name}: {child.value}
                      </span>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() =>
                          openDialog("edit", "outflows", child, parent)
                        }
                        style={{ marginLeft: "10px" }}
                      >
                        {t('edit')}
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() =>
                          openDialog("delete", "outflows", child, parent)
                        }
                        style={{ marginLeft: "10px" }}
                      >
                         {t('delete')}
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog */}
      {isDialogOpen && dialogProps && (
        <DialogBox {...dialogProps} onClose={closeDialog} />
      )}
    </div>
  );
};

export default UpdateData;

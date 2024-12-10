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
    setShowAddOptions(false);
  };

  // Handle Add/Edit/Delete
  const handleDialogSubmit = (type, newItem, category, parent) => {
    const updatedData = { ...data };
    debugger
    if (type === "add" || type === "edit" || type === "delete") {
      if (category === "outflows") {
        // Calculate total parent outflows (exclude children) and total inflows
        let parentOutflows = updatedData.outflows.reduce(
          (sum, outflow) => {if(outflow.id==newItem.id) return sum + (parseFloat(newItem.value) || 0)
            return sum + (parseFloat(outflow.value) || 0)
          },
          0
        );
        const inflowTotal = updatedData.inflows.reduce(
          (sum, inflow) => sum + (parseFloat(inflow.value) || 0),
          0
        );
        if(!parent && type=="add")
         parentOutflows+=newItem.value
        // Check if total parent outflows exceed inflows
        if (parentOutflows > inflowTotal) {
          alert(t("alertMessageTotal"));
          return; // Prevent the update
        }
         if(type=="edit" && !parent){
          const currentParentOutflows = updatedData.outflows.find((key)=>newItem.id==key.id)
          const currentParentOutflowsum = currentParentOutflows.children.reduce((sum, child) => {
            
            return sum + (parseFloat(child.value) || 0);
          }, 0)
          if(currentParentOutflowsum>newItem.value){
            alert(t("alertMessageChild"));
            return;
          }
         }
        if (parent) {
          let childOutflowsSum = parent.children
            ? parent.children.reduce((sum, child) => {
                if (child.id === newItem.id) {
                  return sum + (parseFloat(newItem.value) || 0);
                }
                return sum + (parseFloat(child.value) || 0);
              }, 0)
            : parseFloat(newItem.value) || 0;
  
          const parentValue = parseFloat(parent.value) || 0;
          if(type==="add")
          childOutflowsSum+=newItem.value
  
          if (childOutflowsSum > parentValue) {
            alert(t("alertMessageChild"));
            return; 
          }
        }
      } else if (category === "inflows") {
        const parentOutflows = updatedData.outflows.reduce(
          (sum, outflow) => sum + (parseFloat(outflow.value) || 0),
          0
        );
  
        const inflowTotal = updatedData.inflows.reduce(
          (sum, inflow) => sum + (parseFloat(inflow.value) || 0),
          0
        );
  
        if (type === "edit") {
       
          const oldInflow = updatedData.inflows.find((inflow) => inflow.id === newItem.id);
          const oldValue = parseFloat(oldInflow?.value || 0);
          const newValue = parseFloat(newItem.value || 0);
  
          if (inflowTotal - oldValue + newValue < parentOutflows) {
            alert(t("alertMessageInflow"));
            return; 
          }
        } else if (type === "delete") {
          const inflowToDelete = updatedData.inflows.find((inflow) => inflow.id === newItem.id);
          const deleteValue = parseFloat(inflowToDelete?.value || 0);
  
          if (inflowTotal - deleteValue < parentOutflows) {
            alert(t("alertMessageInflow"));
            return; 
          }
        }
      }
    }
  
    // Proceed with normal operations
    if (type === "add" || type === "edit") {
      if (category === "outflows") {
        if (parent) {
          const parentIndex = updatedData.outflows.findIndex((outflow) => outflow.id === parent.id);
          const dispatchItem =
            type === "add"
              ? { newItem, addType: "outflows", addparent: parentIndex }
              : { editItem: newItem, editParent: parentIndex, type: "outflows" };
          dispatch(type === "add" ? addChartData(dispatchItem) : editChartData(dispatchItem));
        } else {
          const dispatchItem =
            type === "add"
              ? { newItem, addType: "outflows", addparent: parent }
              : { editItem: newItem, editParent: parent, type: "outflows" };
          dispatch(type === "add" ? addChartData(dispatchItem) : editChartData(dispatchItem));
        }
      } else if (category === "inflows") {
        const dispatchItem =
          type === "add"
            ? { newItem, addType: "inflows", parent }
            : { editItem: newItem, parent, type: "inflows" };
        dispatch(type === "add" ? addChartData(dispatchItem) : editChartData(dispatchItem));
      }
    } else if (type === "delete") {
      if (category === "outflows") {
        if (parent) {
          const parentIndex = updatedData.outflows.findIndex((outflow) => outflow.id === parent.id);
          const dispatchItem = { id: newItem.id, deleteParent: parentIndex, deleteType: "outflows" };
          dispatch(deleteChartData(dispatchItem));
        } else {
          const dispatchItem = { id: newItem.id, parent, deleteType: "outflows" };
          dispatch(deleteChartData(dispatchItem));
        }
      } else if (category === "inflows") {
        const dispatchItem = { id: newItem.id, parent, deleteType: "inflows" };
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
               {t('delete')}
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

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const DialogBox = ({ type, category, item, parent, onSubmit, onClose }) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [details, setDetails] = useState("");
  const [childName, setChildName] = useState("");
  const [childValue, setChildValue] = useState("");
  const [id, setId] = useState("");
  const { t } = useTranslation();
  // Determine if Save button should be disabled
  const isSaveDisabled = () => {
    if (type === "delete") return false;
    if (parent) {
      return !childName || !childValue; // For child outflows, check child fields
    }
    return !name || !value || (category === "inflows" && !details); // For general case
  };

  useEffect(() => {
    if (type === "edit" && item) {
      setName(item.name);
      setValue(item.value);
      setDetails(item.details || "");
      setId(item.id);
      if (parent) {
        setName(parent.name);
        setValue(parent.value);
        setId(item.id);
        setChildName(item.name);
        setChildValue(item.value);
      }
    } else if (type === "add" && parent) {
      setName(parent.name);
      setValue(parent.value);
    }
  }, [type, item, parent]);

  // Handle Submit for Add/Edit
  const handleSubmit = () => {
    const newItem = {
      name,
      value: parseFloat(value),
      details,
      id,
    };
    if (parent) {
      newItem.children = [];
      // If parent is present, it's a child outflow
      newItem.name = childName;
      newItem.value = parseFloat(childValue);
    }

    onSubmit(type, newItem, category, parent);
  };

  // Handle Delete
  const handleDelete = () => {
    onSubmit("delete", item, category, parent);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>
        {type === "add"
          ? t("Add {{category}}", { category: category.slice(0, -1) })
          : t(type.toLowerCase())}
      </DialogTitle>
      <DialogContent>
        {type !== "delete" && (
          <>
            <TextField
              label={t("Name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label={t("Value")}
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              fullWidth
              margin="normal"
              disabled={parent && (childName || childValue)} 
            />
            {category === "inflows" && (
              <TextField
                label={t("Details")}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                fullWidth
                margin="normal"
                disabled={parent && (childName || childValue)} 
              />
            )}
            {parent && (
              <>
                <TextField
                  label={t("ChildName")}
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label={t("ChildValue")}
                  type="number"
                  value={childValue}
                  onChange={(e) => setChildValue(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </>
            )}
          </>
        )}
        {type === "delete" && (
          <div>
            {t("deleteText")} {item.name}?
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t("Cancel")}
        </Button>
        <Button
          onClick={type === "delete" ? handleDelete : handleSubmit}
          color="primary"
          disabled={isSaveDisabled()}
        >
          {type === "delete" ? t("delete") : t("Save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;

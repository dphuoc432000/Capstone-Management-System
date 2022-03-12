import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";

export default function FiterTable({
  rows,
  columns,
  onChange,
  currentRow,
  onAdd,
  onSave,
  onClose,
}) {
  const [isAdd, setIsAdd] = React.useState(true);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        onEditRowsModelChange={onChange}
        components={{
          Toolbar: () => {
            return (
              <div className="py-2">
                {isAdd ? (
                  <Button
                    className="d-flex align-items-center"
                    onClick={() => {
                      onAdd();
                      setIsAdd(false);
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <AddOutlinedIcon />{" "}
                      <span className="ml-2 pt-1">Add Record</span>
                    </div>
                  </Button>
                ) : (
                  <div>
                    <Button onClick={() => {onSave(); setIsAdd(true)}}>
                      <div className="d-flex align-items-center">
                        <SaveOutlinedIcon />{" "}
                        <span className="ml-2 pt-1">Save Record</span>
                      </div>
                    </Button>
                    <Button onClick={() => {onClose(); setIsAdd(true)}}>
                      <div className="d-flex align-items-center">
                        <CloseOutlinedIcon />{" "}
                        <span className="ml-2 pt-1">Close Record</span>
                      </div>
                    </Button>
                  </div>
                )}
              </div>
            );
          },
        }}
        editRowsModel={currentRow}
        editMode="row"
      />
    </div>
  );
}

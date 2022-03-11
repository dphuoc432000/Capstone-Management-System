import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./FilterTable.module.scss";

export default function FiterTable({rows, columns}) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

import React, { useState } from "react";

import { DataGridPro, GridRowsProp, GridColDef } from "@mui/x-data-grid-pro";
import Switch from "@mui/material/Switch";
import BadgeAvatars from "./avatarBadge";
import PositionedMenu from "./abc";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./setUpRouting";
import { renderSelectEditCell } from "./selectField";
const TryingTo = ({ Params }) => {
  return <Switch checked={Params} color={"success"} readOnly />;
};
function WellWorking(params) {
  return <ChangingBoolean {...params} />;
}

function ChangingBoolean(props) {
  const { id, value, api, field } = props;
  console.log(api, "Api");
  console.log(id, "ID");
  console.log(value, "Value");
  console.log(field, "Feild");

  const [checked, setChecked] = useState(value);
  const handleChange = (event) => {
    api.setEditCellValue(
      { id, field, value: Boolean(event.target.checked) },
      event
    );
    setChecked(event.target.checked);
  };
  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
      color={"success"}
    />
  );
}
// function getFullName() {
//   console.log("Hello There");
// }

export default function App() {
  // const [editRowsModel, setEditRowsModel] = React.useState({});

  // const handleEditRowModelChange = React.useCallback((params) => {
  //   setEditRowsModel(params.model);
  // }, []);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "col1",
      headerName: "Column 1",
      width: 150,
      // valueGetter: getFullName,
      // valueSetter: getFullName,
    },
    { field: "col2", headerName: "Column 2", width: 150, disableReorder: true },
    {
      field: "value",
      headerName: "Value",
      width: 150,
      description: "This is Description by Sakshi",
      minWidth: 100,
      hide: false,
      // resizable: true,
      // pinnable: false,
      // cellClassName: "rowStyling ",
      filterable: false,
      sortable: false,
      type: "boolean",
      editable: true,
      renderCell: (params) => {
        return <TryingTo Params={params.row.value} />;
      },
      renderEditCell: WellWorking,
    },
  
    {
      field: "status",
      headerName: "status",
      type: "number",
      width: 150,
      editable: true,
      renderEditCell: renderSelectEditCell,
    },
  ];
  const rows: GridRowsProp = [
    { id: 1, col1: "Hello", col2: "World", value: true, status: 1 },
    { id: 2, col1: "LorpeDium", col2: "is Awesome", value: false, status: 2 },
    { id: 3, col1: "Dium", col2: "is Amazing", value: true, status: 3 },
    { id: 4, col1: "Hello", col2: "World", value: true, status: 1 },
    { id: 5, col1: "LorpeDium", col2: "is Awesome", value: false, status: 2 },
    { id: 6, col1: "LorpeDi", col2: "is Amazing", value: true, status: 3 },
  ];
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PositionedMenu />} />
          <Route path="users/*" element={<Users />} />
        </Routes>
      </BrowserRouter>

      <BadgeAvatars />
      <DataGridPro
        sx={{
          marginTop: "20px",
          height: 600,
          width: "100%",
          "& .rowStyling": {
            backgroundColor: "#eeeeee",
          },
        }}
        // editRowsModel={editRowsModel}
        // onEditRowModelChange={handleEditRowModelChange}
        rows={rows}
        columns={columns}
      />
    </div>
  );
}

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import axios from "axios";
import qs from "qs";
import { Grid, Button } from "@mui/material";
import Switch from "@mui/material/Switch";
import QuickSearchToolbar from "./SearchBar";
import { BoxStyle, DataGridStyle } from "./style";
import Tooltip from "@mui/material/Tooltip";

export default function Kanban() {
    const [rows, getRow] = useState([]);
    const [editRowsModel, setEditRowsModel] = useState({});
    const [loading, setLoading] = useState(false);
    const [searchedRow, setSearchedRow] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [pageSize, setPageSize] = useState(10);
    useEffect(() => {
        getRowData();
    }, []);

    const provideAuth = useSelector((state) => state.auth);
    const getToken = provideAuth.access;
    const getRoleID = provideAuth.role_id;

    // Acessing Data from API
    const getRowData = () => {
        setLoading(true);
        axios
            .get("core/api/v1/users", { headers: { Authorization: `Bearer ${getToken}` } })
            .then((response) => {
                if (response.status === 200) {
                    const RowData = response.data;
                    getRow(RowData.users);
                    setSearchedRow(RowData.users);
                    setLoading(false);
                } else {
                    console.log("Getting some error whlie fetching Data");
                }
            })
            .catch((error) => {});
    };

    const handleEditRowsModelChange = useCallback((model) => {
        setEditRowsModel(model);
    }, []);
    function escapeRegExp(value) {
        return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
        const filteredRows = rows.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field]);
            });
        });
        setSearchedRow(filteredRows);
    };

    //Posting the Row Changes
    const updateRowData = (editRowsModel) => {
        const headers = {
            Authorization: `Bearer ${getToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
        };
        const submitData = editRowsModel.row;
        const rowSubmitData = {
            email: `${submitData.email}`,
            phone: `${submitData.phone}`,
            linkedin_link: `${submitData.linkedin_link}`,
            preferred_location: `${submitData.preferred_location}`,
            is_active: `${submitData.is_active}`,
        };
        const data = qs.stringify(rowSubmitData);
        axios
            .post("/core/api/v1/updateuser", data, { headers })
            .then((response) => {
                console.log(response, "Response Data");
                console.log(response.data, "data");
            })
            .catch((error) => console.error(`Error: ${error}`));
    };

    //Vaidating phone
    function validatePhone(phone) {
        const re = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        return re.test(phone);
    }
    const IsActiveEdit = ({ paramsIsActive }) => {
        return <Switch checked={paramsIsActive} color={"success"} readOnly />;
    };
    function EditActiveCell(params) {
        return <ActiveHandleChange {...params} />;
    }
    function ActiveHandleChange(props) {
        const{id, value, api, field} = props;
        const [checked, setChecked] = useState(value);
        const handleChange = (event) => {
            api.setEditCellValue({ id, field, value: Boolean(event.target.checked) }, event);
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
    const ToCapatalized = ({ Params }) => {
        if (Params === null) {
            return Params;
        } else {
            return Params.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
        }
    };
    const FillEmptySpaces = ({ EmptyParams }) => {
        if (EmptyParams == null || EmptyParams == "null" || EmptyParams == "") {
            return <h4>-----</h4>;
        } else {
            return EmptyParams;
        }
    };
    const columns = [
        { field: "id", headerName: "ID", width: 70, cellClassName: "rowStyling" },
        {
            field: "first_name",
            headerName: "First name",
            width: 130,
            cellClassName: "rowStyling ",
            renderCell: (params) => {
                return <ToCapatalized Params={params.row.first_name} />;
            },
        },
        {
            field: "last_name",
            headerName: "Last name",
            width: 130,
            cellClassName: "rowStyling",
            renderCell: (params) => {
                return <ToCapatalized Params={params.row.last_name} />;
            },
        },
        { field: "email", headerName: "Email", width: 160, cellClassName: "rowStyling" },
        {
            field: "phone",
            headerName: "Phone",
            width: 130,
            editable: true,
            preProcessEditCellProps: (params) => {
                const isValid = validatePhone(params.props.value);
                return { ...params.props, error: !isValid };
            },
        },
        {
            field: "job_title",
            headerName: "Job Title",
            width: 130,
            cellClassName: "rowStyling",
            renderCell: (params) => <FillEmptySpaces EmptyParams={params.row.job_title} />,
        },
        {
            field: "linkedin_link",
            headerName: "Linkedin",
            width: 150,
            editable: true,
            cellClassName: "pointer-cursor",
            renderCell: (params) =>
                params.row.linkedin_link == "null" || params.row.linkedin_link == null ? (
                    <h4>-----</h4>
                ) : (
                    <a href={"//" + params.row.linkedin_link} target="_blank">
                        {params.row.linkedin_link}{" "}
                    </a>
                ),
        },
        {
            field: "department",
            headerName: "Department",
            width: 130,
            cellClassName: "rowStyling",
            renderCell: (params) => {
                return <ToCapatalized Params={params.row.department} />;
            },
        },
        {
            field: "office_location",
            headerName: "Office Location",
            width: 130,
            cellClassName: "rowStyling",
            renderCell: (params) => <FillEmptySpaces EmptyParams={params.row.office_location} />,
        },
        {
            field: "preferred_location",
            headerName: "Preffered Location",
            width: 130,
            editable: true,
            renderCell: (params) => <FillEmptySpaces EmptyParams={params.row.preferred_location} />,
        },
        {
            field: "parent_name",
            headerName: "Reports to",
            width: 130,
            cellClassName: "rowStyling pointer-cursor",
            renderCell: (params) => (
                <Tooltip title={params.row.parent_email} arrow>
                    <span>{params.row.parent_name}</span>
                </Tooltip>
            ),
        },
        {
            field: "dob",
            headerName: "DOB",
            width: 100,
            cellClassName: "rowStyling",
            renderCell: (params) => <FillEmptySpaces EmptyParams={params.row.dob} />,
        },
        {
            field: "doj",
            headerName: "DOJ",
            width: 100,
            cellClassName: "rowStyling",
            renderCell: (params) => <FillEmptySpaces EmptyParams={params.row.doj} />,
        },
        {
            field: "is_active",
            headerName: "Active",
            width: 130,
            editable: true,
            type: "boolean",
            renderCell: (params) => {
                return <IsActiveEdit paramsIsActive={params.row.is_active} />;
            },
            renderEditCell: EditActiveCell,
        },
        {
            field: "ad",
            headerName: "Ad",
            width: 130,
            cellClassName: "rowStyling",
            type: "boolean",
            renderCell: (params) => <Switch checked={params.row.ad} disabled />,
        },
        {
            field: "eiq",
            headerName: "Eiq",
            width: 130,
            cellClassName: "rowStyling",
            type: "boolean",
            renderCell: (params) => <Switch checked={params.row.eiq} disabled />,
        },
    ];

    return (
        <div>
            {getRoleID == 1 ? (
                <Box sx={BoxStyle}>
                    <DataGrid
                        sx={DataGridStyle}
                        disableSelectionOnClick
                        components={{ Toolbar: QuickSearchToolbar }}
                        loading={loading}
                        rows={searchedRow}
                        columns={columns}
                        pageSize={pageSize}
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        componentsProps={{
                            toolbar: {
                                value: searchText,
                                onChange: (event) => requestSearch(event.target.value),
                                clearSearch: () => requestSearch(""),
                            },
                        }}
                        editMode="row"
                        sortingOrder={["asc", "desc"]}
                        editRowsModel={editRowsModel}
                        onEditRowsModelChange={handleEditRowsModelChange}
                        onRowEditStop={updateRowData}
                    />
                </Box>
            ) : (
                <div className="text-center">
                    <Grid
                        container
                        spacing={0}
                        align="center"
                        justify="center"
                        direction="column"
                        style={{ minHeight: "100vh" }}>
                        <Grid item p={4}>
                            <h2>Sorry, Only Admin can access this table !!</h2>
                            <Grid onClick={(e) => (window.location.href = "/")}>
                                <Button variant="contained" size="small">
                                    Go To Home
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    );
}

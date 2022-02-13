import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const SelectField = (props) => {
  const { id, value, api, field } = props;
  const classes = useStyles();

  const handleChange = React.useCallback(
    (event) => {
      const editProps = {
        value: Number(event.target.value)
      };

      api.commitCellChange({ id, field, props: editProps });
      api.setCellMode(id, field, "view");
      event.stopPropagation();
    },
    [api, field, id]
  );

  return (
    <FormControl className={classes.formControl}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
      >
        <MenuItem style={{backgroundColor:"green"}}value={1}>Done</MenuItem>
        <MenuItem style={{backgroundColor:"yellow"}}value={2}>In Progress</MenuItem>
        <MenuItem style={{backgroundColor:"red"}}value={3}>Stuck</MenuItem>
      </Select>
    </FormControl>
  );
};

export function renderSelectEditCell(params) {
  return <SelectField {...params} />;
}

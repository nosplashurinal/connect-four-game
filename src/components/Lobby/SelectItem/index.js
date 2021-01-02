import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  itemRoot: {
    background: "#EFF3FF",
    margin: 0,
    marginBottom: theme.spacing(0.5),
    borderRadius: 10,
  },
}));

export default function SelectItem({ initialValue, options, onChange }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(initialValue);

  const handleChange = (event) => {
    setValue(parseInt(event.target.value));
    onChange(parseInt(event.target.value));
  };
  return (
    <FormControl component="fieldset">
      <RadioGroup value={value} onChange={handleChange}>
        {options.map(({ label, value }) => (
          <FormControlLabel
            key={value}
            className={classes.itemRoot}
            value={value}
            control={<Radio color="primary" />}
            label={label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

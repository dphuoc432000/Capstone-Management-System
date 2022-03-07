import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function ListCheckbox({ list, Label, onChange }) {

    return (
        <Box
            className="light-border p-3"
            sx={{ display: "flex", borderRadius: "5px" }}
        >
            <FormControl className="w-100" component="fieldset" variant="standard">
                <input
                    type="search"
                    className="form-control w-100 mb-3"
                    placeholder="Enter a name"
                />
                <FormGroup>
                    {list.map((value, index) => (
                        <FormControlLabel
                            key={index}
                            checked={value.checked}
                            onChange={onChange}
                            control={<Checkbox name={value.itemId} />}
                            label={<Label {...value} />}
                        />
                    ))}
                </FormGroup>
            </FormControl>
        </Box>
    );
}

import React, { useState } from 'react';
import RegexValidation from '../../DataValidation/RegexValidation/RegexValidation.component';

function Combobox({ defaultValue, onChange, message, list, shownName, gettedName, isSubmitted }) {
    const [text, setText] = useState("");

    const handleChange = (event) => {
        onChange(event);
        setText(event.target.value);
    }

    return (
        <div>
            <select onChange={handleChange} defaultValue={defaultValue} class="form-control w-100" id="exampleFormControlSelect1">
                <option>Choose a field</option>
                {
                    list.map((item) => {
                        return <option item={item[gettedName]}>{item[shownName]}</option>;
                    })
                }
            </select>
            <RegexValidation message={isSubmitted && !text ? message : ""} />
        </div>
    );
}

export default Combobox;
import React, { useState } from 'react';
import RegexValidation from '../../DataValidation/RegexValidation/RegexValidation.component';

function Textbox({ regex, defaultValue, onChange, placeholder, message, isSubmitted }) {
    const [error, setError] = useState("");
    const [text, setText] = useState("");

    const handleCheck = (event) => {
        onChange(event);
        const { value } = event.target;
        setText(value);
        var isValid = regex.exec(value);
        if (!isValid) setError(message);
        else setError("");
    }

    return (
        <div>
            <input type="text" defaultValue={defaultValue} className="form-control" onChange={handleCheck} placeholder={placeholder} />
            <RegexValidation message={error} />
            <RegexValidation message={isSubmitted && !text ? message : ""} />
        </div>
    );
}

export default Textbox;
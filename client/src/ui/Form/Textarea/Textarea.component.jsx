import React, { useState } from "react";
import RegexValidation from "../../DataValidation/RegexValidation/RegexValidation.component";

function Textarea({ regex, defaultValue, onChange, message }) {
    const [error, setError] = useState("");

    const handleCheck = (event) => {
        onChange(event);
        const { value } = event.target;
        var isValid = regex.exec(value);
        if (!isValid) setError(message);
        else setError("");
    };

    return (
        <div>
            <textarea
                class="form-control"
                rows="1"
                defaultValue={defaultValue}
                onChange={handleCheck}
            ></textarea>
            <RegexValidation message={error} />
        </div>
    );
}

export default Textarea;

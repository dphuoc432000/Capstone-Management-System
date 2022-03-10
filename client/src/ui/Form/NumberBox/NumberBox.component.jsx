import { useState } from "react";
function NumberBox({ placeholder, Icon, type, onChange, min, max , message }) {
    var [error, setError] = useState("");
    return (
      <div>
        <div>
          <span>
            <Icon></Icon>
          </span>
          <input
            className="form-control"
            placeholder={placeholder}
            type={type}
            onChange={function(event){
                var value = event.target.value;
                if(Number.isInteger(parseInt(value)) === false || min > parseInt(value) || parseInt(value) > max) 
                    setError(message);
                else
                    setError("");
            }}
          />
        </div>
        <div>
          <p className="error-text">{error}</p>
        </div>
      </div>
    );
}
export default NumberBox;

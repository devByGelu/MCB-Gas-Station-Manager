import React from "react";
import renderTextField from "../../../shared/renderTextField";
import { createNumberMask } from "redux-form-input-masks";
import { Field } from "redux-form";

function CurrencyInput({ disabled, ...props }) {
  return (
    <Field
      {...props}
      disabled={disabled}
      type="tel"
      size="small"
      component={renderTextField}
      {...createNumberMask({
        prefix: "PHP",
        decimalPlaces: 2,
        allowNegative: false,
      })}
    />
  );
}

export default CurrencyInput;

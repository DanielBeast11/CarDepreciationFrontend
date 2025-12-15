import {FormGroup, Input, Label} from "reactstrap";
import {Dispatch, SetStateAction} from "react";

type Props = {
    label?: string
    placeholder?: string
    value: number
    setValue?: Dispatch<SetStateAction<number>>
    disabled?: boolean
    required?: boolean
    error?: boolean
    valid?: boolean
    className?: string
}

const CustomInputNumber = ({label="", placeholder="", value, setValue, disabled=false, required=true, error=false, valid=false, className="w-100"}:Props) => {
    return (
        <FormGroup>
            {label && <Label>{label}</Label>}
            <Input
                placeholder={placeholder}
                className={className}
                type="number"
                value={value}
                onChange={(e) => setValue && setValue(Number(e.target.value))}
                invalid={error}
                disabled={disabled}
                required={required}
                valid={valid}
            />
        </FormGroup>
    );
};

export default CustomInputNumber

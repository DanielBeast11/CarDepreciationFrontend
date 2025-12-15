import {FormGroup, Input, Label} from "reactstrap";
import {Dispatch, SetStateAction} from "react";

type Props = {
    label?: string
    placeholder?: string
    value: string
    setValue?: Dispatch<SetStateAction<string>>
    disabled?: boolean
    required?: boolean
    error?: boolean
    valid?: boolean
    className?: string
}

const CustomInputText = ({label="", placeholder="", value, setValue, disabled=false, required=true, error=false, valid=false, className="w-100"}:Props) => {
    return (
        <FormGroup>
            {label && <Label>{label}</Label>}
            <Input
                placeholder={placeholder}
                className={className}
                type="text"
                value={value}
                onChange={(e) => setValue && setValue(e.target.value)}
                invalid={error}
                disabled={disabled}
                required={required}
                valid={valid}
            />
        </FormGroup>
    );
};

export default CustomInputText

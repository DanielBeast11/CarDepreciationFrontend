import {FormGroup, Input, Label} from "reactstrap";

type Props = {
    label: string,
    placeholder: string,
    value: string,
    setValue: (value: string) => void,
    disabled?: boolean,
}

const CustomTextarea = ({label, placeholder, value, setValue, disabled}:Props) => {
    return (
        <FormGroup>
            <Label>{label}</Label>
            <Input placeholder={placeholder} className="w-100" type="textarea" rows="5" value={value} onChange={(e) => setValue(e.target.value)} style={{resize:"none"}} disabled={disabled} required/>
        </FormGroup>
    )
};

export default CustomTextarea

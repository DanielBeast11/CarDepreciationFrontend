import CustomDropdown from "components/CustomDropdown/CustomDropdown.tsx";

type Props = {
    label: string,
    selectedItem: number,
    setSelectedItem: (value:number) => void,
    disabled?: boolean,
}

export const CustomDropdownBoolean = ({label, selectedItem, setSelectedItem, disabled=false}:Props) => {
    const options = {
        0: "Нет",
        1: "Да"
    }

    return (
        <div className="w-25 mb-3">
            <CustomDropdown label={label} options={options} selectedItem={selectedItem} setSelectedItem={setSelectedItem} disabled={disabled} className={"w-100"}/>
        </div>
    )
}


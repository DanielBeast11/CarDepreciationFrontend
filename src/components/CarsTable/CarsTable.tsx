import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {Button} from "reactstrap";
import CustomTable from "components/CustomTable/CustomTable.tsx";
import {deleteCar} from "store/slices/carsSlice.ts";
import {useAppDispatch} from "store/store.ts";
import {Cars} from "src/api/Api.ts";

type Props = {
    cars:Cars[]
}

const CarsTable = ({cars}:Props) => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const handleClick = (car_id:number) => {
        navigate(`/cars/${car_id}`)
    }

    const openCarEditPage = (car_id:number) => {
        navigate(`/cars/${car_id}/edit`)
    }

    const handleDeleteCar = async (car_id:string) => {
        dispatch(deleteCar(car_id))
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Фото',
                accessor: 'image',
                Cell: ({ value }:any) => <img src={value} width={100} />
            },
            {
                Header: 'Название',
                accessor: 'name',
                Cell: ({ value }) => value
            },
            {
                Header: 'VIN',
                accessor: 'vin',
                Cell: ({ value }) => value
            },
            {
                Header: "Действие",
                accessor: "edit_button",
                Cell: ({ cell }) => (
                    <Button color="primary" onClick={() => openCarEditPage(cell.row.values.id)}>Редактировать</Button>
                )
            },
            {
                Header: "Удалить",
                accessor: "delete_button",
                Cell: ({ cell }) => (
                    <Button color="danger" onClick={() => handleDeleteCar(cell.row.values.id)}>Удалить</Button>
                )
            }
        ],
        []
    )

    if (!cars.length) {
        return null
    }

    return (
        <CustomTable columns={columns} data={cars} onClick={handleClick} />
    )
};

export default CarsTable

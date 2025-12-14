import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteDraftDepreciation,
    fetchDepreciation,
    removeDepreciation,
    sendDraftDepreciation,
    updateDepreciation
} from "store/slices/depreciationsSlice.ts";
import {Button, Col, Form, Row} from "reactstrap";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import {E_DepreciationStatus} from "modules/types.ts";
import {CarItem} from "src/api/Api.ts";
import CarCardDepreciation from "components/CarCardDepreciation/CarCardDepreciation.tsx";

const DepreciationPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated} = useAppSelector((state) => state.user)

    const depreciation = useAppSelector((state) => state.depreciations.depreciation)

    const [price, setPrice] = useState(depreciation?.price)

    const [calcfield, setCalcfield] = useState(depreciation?.summ)

    const [saveMM, setSaveMM] = useState<boolean>(false)

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/")
        }
    }, [is_authenticated]);

    useEffect(() => {
        if (id && is_authenticated) {
            dispatch(fetchDepreciation(id))
        }
        return () => {
            dispatch(removeDepreciation())
        }
    }, []);

    useEffect(() => {
        setPrice(depreciation?.price)
        setCalcfield(depreciation?.summ)
    }, [depreciation]);

    const sendDepreciation = async (e:React.FormEvent) => {
        e.preventDefault()

        await saveDepreciation()

        await dispatch(sendDraftDepreciation())

        navigate("/depreciations/")
    }

    const saveDepreciation = async (e?:React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault()

        const data = {
            price
        }

        await dispatch(updateDepreciation(data))
        setSaveMM(value => !value)
    }

    const saveDepreciationMM = () => {
        setSaveMM(value => !value)
    }

    const saveDepreciationField = async () => {
        const data = {
            price
        }

        await dispatch(updateDepreciation(data))
    }

    const deleteDepreciation = async () => {
        await dispatch(deleteDraftDepreciation())
        navigate("/cars/")
    }

    if (!depreciation) {
        return (
            <div>

            </div>
        )
    }

    const isDraft = depreciation.status == E_DepreciationStatus.Draft

    return (
        <Form onSubmit={sendDepreciation} className="pb-5">
            <h2 className="mb-5">{isDraft ? "Черновой расчет" : `Амортизация №${id}` }</h2>
            <Row className="mb-5 fs-5 w-25">
                <CustomInput label="Первичная оценка суммы" placeholder="Введите стоимость" value={price || 0} setValue={setPrice} disabled={!isDraft}/>
                <CustomInput label="Сумма амортизации" value={calcfield || "Не расчитано"} disabled={true}/>
            </Row>
            <Row>
                {depreciation.cars && depreciation.cars.length > 0 ? depreciation.cars.map((car:CarItem) => (
                    <Row key={car.id} className="d-flex justify-content-center mb-3">
                        <CarCardDepreciation car={car} showRemoveBtn={isDraft} editMM={isDraft} saveMM={saveMM} />
                    </Row>
                )) :
                    <h3 className="text-center">Список пуст</h3>
                }
            </Row>
            {isDraft &&
                <Row className="mt-5">
                    <Col className="d-flex gap-5 justify-content-center flex-wrap">
                        <Button color="success" className="fs-12" onClick={saveDepreciation}>Сохранить</Button>
                        <Button color="success" className="fs-12" onClick={saveDepreciationMM}>Сохранить пробег</Button>
                        <Button color="success" className="fs-12" onClick={saveDepreciationField}>Сохранить первичную оценку</Button>
                        <Button color="primary" className="fs-12" type="submit">Отправить</Button>
                        <Button color="danger" className="fs-12" onClick={deleteDepreciation}>Удалить</Button>
                    </Col>
                </Row>
            }
        </Form>
    );
};

export default DepreciationPage

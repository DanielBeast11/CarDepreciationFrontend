import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {T_Car} from "modules/types.ts";
import "./styles.css"

interface Props {
    selectedCar: T_Car | null
}

const Breadcrumbs = ({ selectedCar }: Props) => {

    const location = useLocation()

    return (
        <Breadcrumb className="fs-5">
			{location.pathname == "/" &&
				<BreadcrumbItem>
					<Link to="/">
						Главная
					</Link>
				</BreadcrumbItem>
			}
			{location.pathname.includes("/cars") &&
                <BreadcrumbItem active>
                    <Link to="/cars">
						Автомобили
                    </Link>
                </BreadcrumbItem>
			}
            {selectedCar &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        { selectedCar.name }
                    </Link>
                </BreadcrumbItem>
            }
			<BreadcrumbItem />
        </Breadcrumb>
    );
};

export default Breadcrumbs
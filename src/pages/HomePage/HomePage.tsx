import {Container, Row} from "reactstrap";
import CarVideo from '../../assets/video.mp4'

const HomePage = () => {
	return (
		<Container>
			<Row>
				<h1 className="mb-3">Расчет амортизации автомобилей логистической компании</h1>
				<p className="fs-5">Расчёт амортизации автомобилей логистической компании используется для финансового планирования и управления стоимостью автопарка</p>
				<video className='video' autoPlay muted loop src={CarVideo}></video>
			</Row>
		</Container>
	)
}

export default HomePage
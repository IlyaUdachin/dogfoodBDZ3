import { Link } from "react-router-dom";
import { VK, TG } from "../../env"
import pathIconVK from "../../assets/images/icons/vk.png"
import pathIconTG from "../../assets/images/icons/tg.png"
import {
	EnvelopePlusFill,
	TelephoneInboundFill,
	GeoAltFill,
} from "react-bootstrap-icons";
import SearchProd from "../Search";

const Nav = ({ user }) => {
	return (
		<div className='navigation'>
			<Link to="mailto:info@dogfood.ru"><EnvelopePlusFill />&nbsp;<span>info@dogfood.ru</span></Link>
			<div>
				<Link to={VK} target="_blank"><img width="25px" src={pathIconVK} alt="ВКонтакте" /></Link>
				<Link to={TG} target="_blank"><img width="28px" src={pathIconTG} alt="Телеграмм" /></Link>
			</div>
			<Link to="tel:+7800800800"><TelephoneInboundFill />&nbsp;<span>+7(800)800800</span></Link>
			<Link to="#"><GeoAltFill />&nbsp;<span>г. Долгопрудный, ул. Набережная</span></Link>
			{!user && <span style={{ visibility: "hidden" }}></span>}
			{user && <span style={{ visibility: "visible" }}>
				<SearchProd />
			</span>}
		</div>
	);
}

export default Nav;

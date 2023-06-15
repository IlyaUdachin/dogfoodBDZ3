import { VK, TG } from "../../env"
import { Link } from "react-router-dom";
import pathIconVK from "../../assets/images/icons/vk.png"
import pathIconTG from "../../assets/images/icons/tg.png"

const Footer = ({ user }) => {
	return <footer>
		<div className="footerLink header__menu">
			{user && <>
				<Link to="/catalog" title="Каталог">
					<span>Каталог</span>
				</Link>&nbsp;
				<Link to="/" title="Избранное">
					<span>Избранное</span>
				</Link>&nbsp;
				<Link to="/" title="Корзина">
					<span>Корзина</span>
				</Link>&nbsp;
				<Link to="/profile" title="Профиль">
					<span>Профиль</span>
				</Link></>
			}
		</div>
		<div className="footerContact">
			<div className="tel"><Link to="tel:+7800800800">+7(800)800800</Link></div>
			<div><Link to="mailto:info@dogfood.ru">info@dogfood.ru</Link></div>
			<div><Link to="#">г. Долгопрудный, ул. Набережная</Link></div>
		</div>
		
	</footer>
}

export default Footer;
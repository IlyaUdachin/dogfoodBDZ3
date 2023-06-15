import Logo from "./Logo"
import { Link } from "react-router-dom";
import {
	CardHeading,
	Star,
	Cart4,
	PersonSquare,
	BoxArrowInRight,
} from "react-bootstrap-icons";


const Header = ({ user, setUser, setModalActive }) => {

	const logIn = (e) => {
		e.preventDefault();
		setUser("dogUser")
		localStorage.setItem("dogUser", "userKey")
		setModalActive(true)
	}
	return <header>
		<Logo />
		<nav className="header__menu">
			{user && <>
				<Link to="/catalog" title="Каталог">
					<CardHeading /> <span>Каталог</span>
				</Link>
				<Link to="/" title="Избранное">
					<Star /> <span>Избранное</span>
				</Link>
				<Link to="/" title="Корзина">
					<Cart4 /> <span>Корзина</span>
				</Link>
				<Link to="/profile" title="Профиль">
					<PersonSquare /> <span>Профиль</span>
				</Link>
			</>
			}
			{!user && <>
				<Link to="/profile" title="Войти" onClick={logIn}>
					<BoxArrowInRight /> <span>Войти</span>
				</Link></>
			}
		</nav>
	</header>
}

export default Header;

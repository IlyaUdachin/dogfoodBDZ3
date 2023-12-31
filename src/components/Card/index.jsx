import "./style.css"
import { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { Heart, HeartFill } from "react-bootstrap-icons";
import saleIcon from "../../assets/images/icons/sale.png"
import newIcon from "../../assets/images/icons/new.png"
import Context from "../../context"

const Card = ({ img, name, price, _id, discount, tags, likes, dogToken }) => {
	const { serverProducts, setSrvProducts } = useContext(Context)
	const userLike = likes?.includes(localStorage.getItem("dogUserId"))
	const [isLike, setIsLike] = useState(userLike)

	const updLike = (e) => {
		e.stopPropagation();
		e.preventDefault()
		setIsLike(!isLike)
		fetch(
			`https://api.react-learning.ru/products/likes/${_id}`,
			{
				method: isLike ? 'DELETE' : 'PUT',
				headers: { "Authorization": `Bearer ${dogToken}` }
			})
			.then(res => res.json())
			.then(data => {
				setSrvProducts(function (old) {
					const arr = old.map(el => {
						if (el._id === _id) {
							return data;
						} else {
							return el;
						}
					});
					return arr;
				})
			})
	}

	return (
		<Link to={`/product/${_id}`} className="card" >
			<span className="headCard" >
				<span className="loveIcon" onClick={updLike}>{isLike ? <HeartFill /> : <Heart />}</span>
				{tags.map((e) => <span className="newSaleIcon" key={e}>
					{
						e === "sale"
							? <img src={saleIcon} alt="Распродажа" />
							: ""
					}
					{
						e === "new"
							? <img src={newIcon} alt="Новинка" />
							: ""
					}
				</span>)}
			</span>
			{/* {discount > 0 && <span><Percent /> {discount}</span>} */}
			<img src={img} className="card_image" alt="Картинка" />
			<span className="card_name">{name}</span>
			<span className="card_price">
				{discount > 0
					?
					<>
						<del style={{ color: "crimson" }}>{price}</del>&nbsp;
						{discount > 0 && <span style={{ color: "crimson" }}>-{discount}%</span>}&nbsp;
						<>=&nbsp;
							{price * (100 - discount) / 100}
						</>
					</>
					:
					price
				}&nbsp;
				р.</span>
			<button className="card_button">В корзину</button>

		</Link >
	);
}

export default Card;

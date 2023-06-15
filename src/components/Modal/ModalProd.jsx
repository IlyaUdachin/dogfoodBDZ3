import { React, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Container, Image, ButtonGroup } from 'react-bootstrap';
import Context from '../../context';
const ModalProd = ({ active, setModalActiveProduct }) => {
	const navigate = useNavigate()
	const { product, dogToken, setSrvProducts } = useContext(Context)
	console.log({ product });
	const [nameP, setNameP] = useState("")
	const [imgP, setImgP] = useState("")
	const [descrP, setDescrP] = useState("Тут пока ничего нет...");
	const [discountP, setDiscountP] = useState(0);
	const [priceP, setPriceP] = useState(0);
	const [stockP, setStockP] = useState(0);
	const [tagP, setTagP] = useState("");
	const [tagsP, setTagsP] = useState([]);
	const [weightP, setWeightP] = useState("");


	const updTag = (val) => {
		const text = val.toLocaleLowerCase();
		let cut = text.slice(0, text.length - 1);
		if (/[\s.,;!?]$/.test(text)) {
			setTagsP(prev => prev.includes(cut) ? prev : [...prev, cut]);
			setTagP("");
		} else {
			setTagP(text);
		}
	}

	const delTag = (tag) => {
		setTagsP(prev => prev.filter(tg => tg !== tag))
	}

	const editProd = (e) => {
		e.preventDefault();
		const body = {
			name: nameP,
			price: priceP,
			pictures: imgP,
			discount: discountP,
			wight: weightP,
			stock: stockP,
			description: descrP,
			tags: tagP?.length && !tagsP?.includes(tagP) ? [...tagsP, tagP] : tagsP
		}
		fetch(`https://api.react-learning.ru/products/${product._id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${dogToken}`
			},
			body: JSON.stringify(body)
		})
			.then(res => res.json())
			.then(data => {
				if (!data.err && !data.error) {
					setSrvProducts(prev => [data, ...prev]);
					navigate(`/product/${data._id}`)
					setModalActiveProduct(false);
				}
			})
	}

	useEffect(() => {
		setNameP(product?.name)
		setImgP(product?.pictures)
		setDescrP(product?.description)
		setDiscountP(product?.discount)
		setPriceP(product?.price)
		setStockP(product?.stock)
		setTagP("")
		setTagsP(product?.tags)
		setWeightP(product?.wight)
	}, [navigate]);

	return (
		<Container style={{ overflowY: "auto" }}>
			<Row className="modal_window_prod" style={{ display: active ? "flex" : "none" }}>
				<Row className="modal_inside_prod">
					<h2 style={{ marginBottom: "15px" }}>Редактировать</h2>

					<Form>
						<Form.Group>
							<Form.Label htmlFor="idName">Наименование продукта</Form.Label>
							<Form.Control id="idName" type='text' value={nameP} onChange={(e) => setNameP(e.currentTarget.value)} />
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="idImg">Изображение </Form.Label>
							<Image id='idImg' width={350} src={imgP} rounded />
							<Form.Control type='url' value={imgP} onChange={(e) => setImgP(`${e.currentTarget.value}`)} />
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="idPrice">Цена</Form.Label>
							<Form.Control id="idPrice" type='number' value={priceP} onChange={(e) => setPriceP(e.currentTarget.value)} />
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="idDiscount">Скидка в процентах</Form.Label>
							<Form.Control id="idDiscount" type='number' value={discountP} onChange={(e) => setDiscountP(e.currentTarget.value)} />
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="idStock">Количество</Form.Label>
							<Form.Control id="idStock" type='number' value={stockP} onChange={(e) => setStockP(e.currentTarget.value)} />
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="idWeight">Вес в граммах</Form.Label>
							<Form.Control id="idWeight" type='text' value={weightP} onChange={(e) => setWeightP(e.currentTarget.value)} />
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="idDescr">Описание</Form.Label>
							<Form.Control id="idDescr" as='textarea' row={3} value={descrP} onChange={(e) => setDescrP(e.currentTarget.value)} />
						</Form.Group>
						<Form.Group className="my-3">
							<Form.Label htmlFor="tags">Теги</Form.Label>
							<Form.Control
								type="text"
								id="tags"
								value={tagP}
								onChange={(e) => updTag(e.target.value)}
							/>
							{tagsP?.length > 0 && <Form.Text>
								{tagsP.map(e => <span
									className={`d-inline-block lh-1 bg-dark text-light p-2 mt-2 me-2 rounded-1 `}
									key={e}
									onClick={() => delTag(e)}
									style={{ pointerEvents: "auto" }}
								>{e}</span>)}
							</Form.Text>}
						</Form.Group>
					</Form>
					<ButtonGroup>
						<Button variant="success" onClick={editProd}>Сохранить</Button>
						<Button onClick={() => {
							setModalActiveProduct(false);
							navigate(`/product/${product._id}`)

						}}>Отмена</Button>
					</ButtonGroup>
				</Row>
			</Row>
		</Container>
	);
}

export default ModalProd;

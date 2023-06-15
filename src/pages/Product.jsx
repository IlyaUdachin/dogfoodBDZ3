import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"
import Loader from "../components/Loader";
import { Truck, BoxArrowInRight, PencilFill, Trash2Fill, TrashFill } from "react-bootstrap-icons";
import { Container, Row, Col, Form, Button, Card, FormLabel } from "react-bootstrap";
import Context from "../context";
import ReviewsBlock from "../components/Reviews";

const Product = () => {
	const { product, setProduct, dogToken, setSrvProducts, userId, setModalActiveProduct } = useContext(Context)
	const { id } = useParams()
	const navigate = useNavigate()
	const deleteProd = () => {
		fetch(`https://api.react-learning.ru/products/${id}`,
			{ method: "DELETE", headers: { "Authorization": `Bearer ${dogToken}` } })
			.then(res => res.json())
			.then(data => {
				setSrvProducts(function (old) {
					const arr = old.filter(el => el._id !== id)
					return arr;
				})
			}
			)
		setProduct({})
		navigate(`/catalog`)
	}

	useEffect(() => {
		fetch(`https://api.react-learning.ru/products/${id}`,
			{ headers: { "Authorization": `Bearer ${dogToken}` } })
			.then(res => res.json())
			.then(data => setProduct(data))
	}
		, [])

	return (
		<Container className="cntProduct" fluid style={{ gridColumn: "1/5" }}>
			<Row>
				<Col xs={12} md={2}></Col>
				<Col xs={12} md={10}>
					{!product.name
						?
						<Loader />
						:
						<Row>
							<h2 className="d-flex justify-content-center justify-content-md-start">
								{product.name}
							</h2>
						</Row>
					}
				</Col>
			</Row>
			<Row >
				<Col xs={12} md={1}>
				</Col>
				<Col xs={12} md={4}>
					{<img width="100%" src={product.pictures} alt={product.name} />}
				</Col>
				<Col xs={12} md={4}>
					<Row >
						<h3 className="card_price d-flex justify-content-center justify-content-md-start">
							<span>цена: &nbsp;</span>
							{product.discount > 0
								?
								<>
									<del style={{ color: "crimson" }}>{product.price}</del>&nbsp;
									{product.discount > 0 && <span style={{ color: "crimson" }}>-{product.discount}%</span>}&nbsp;
									<>=&nbsp;
										{product.price * (100 - product.discount) / 100}
									</>
								</>
								:
								product.price

							}&nbsp;
							р.</h3>
					</Row>
					<Row>
						<Form.Group className="d-flex align-items-center justify-content-center justify-content-md-start">
							<FormLabel>Введите<br />количество:&nbsp;</FormLabel>
							<Form.Control className="inputCount" type="number" placeholder="0" />
							<Button variant="success" className
								="btnCount" size="xs">Купить</Button>
						</Form.Group>
					</Row>
					<Row className="d-flex justify-content-center justify-content-md-start" >
						<Card variant="primary" style={{ width: '18rem' }}>
							<Card.Body>
								<Card.Title>Доставка &nbsp;<Truck /></Card.Title>
								<Card.Subtitle className="mb-2 text-muted">по Ростову-на-Дону</Card.Subtitle>
								<Card.Text>
									Доставка от 5000 р. по г.Ростову-на Дону бесплатна
								</Card.Text>
								<Card.Subtitle className="mb-2 text-muted">Иногородняя и по области</Card.Subtitle>
								<Card.Text>
									Отправляем через СДЭК, ПЭК, Boxberry, Почта России
								</Card.Text>
								<Card.Link href="#">условия доставки</Card.Link>
							</Card.Body>
						</Card>
					</Row>
					{/* кнопки удаления и редактирования */}
					<Row className="d-flex justify-content-center justify-content-md-start" >
						{userId === product.author?._id ?
							<Card style={{ width: '18rem', backgroundColor: "lightgrey" }}>
								<Link to="/prod_edit" title="Профиль" onClick={() => setModalActiveProduct(true)}>
									<PencilFill /> <span>Редактировать товар</span>
								</Link>
								<Button variant="link" onClick={deleteProd} style={{ color: "crimson", textDecoration: 'none' }}><TrashFill />&nbsp;Удалить</Button>

							</Card>
							: <> </>}
					</Row>
				</Col>
			</Row>
			<Row >
				<Col xs={12} md={1}></Col>
				<Col xs={12} md={11}>
					<h3 className="d-flex justify-content-center justify-content-md-start" style={{ marginBottom: "10px" }}>Описание</h3>
					<Row style={{ margin: "0" }}>{product.description}</Row>
				</Col>
			</Row>
			<ReviewsBlock product={product} setProduct={setProduct} />

		</Container >
	);
}

export default Product;
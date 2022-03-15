import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import uuid from "react-uuid";
// styles
import "./Create.css";

export default function Create() {
	const [title, setTitle] = useState("");
	const [method, setMethod] = useState("");
	const [cookingTime, setCookingTime] = useState("");
	const [newIngredient, setNewIngredient] = useState("");
	const [ingredients, setIngredients] = useState([]);
	const ingredientInput = useRef(null);
	let history = useHistory();

	const { postData, data, error } = useFetch(
		"http://localhost:3000/recipes",
		"POST"
	);

	const handleTitle = (e) => {
		setTitle(e.target.value);
	};
	const handleTime = (e) => {
		setCookingTime(e.target.value);
	};
	const handleMethod = (e) => {
		setMethod(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		postData({
			title,
			ingredients,
			method,
			cookingTime: cookingTime + " minutes",
		});
	};
	useEffect(() => {
		if (data) {
			history.push("/");
		}
	}, [data]);

	const handleIngredients = (e) => {
		setNewIngredient(e.target.value);
	};

	const handleAddIngredient = (e) => {
		e.preventDefault();
		const ing = newIngredient.trim();
		if (ing && !ingredients.includes(ing)) {
			setIngredients((prev) => [...prev, ing]);
		}
		setNewIngredient("");
		ingredientInput.current.focus();
	};

	return (
		<div className="create">
			<h2 className="page-title">Add a New Recipe</h2>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Recipe title: </span>
					<input type="text" onChange={handleTitle} value={title} />
				</label>
				{/* ingredients go here */}
				<label>
					<span>Recipe ingredients: </span>
					<div className="ingredients">
						<input
							type="text"
							onChange={handleIngredients}
							value={newIngredient}
							ref={ingredientInput}
						/>
						<button className="btn" onClick={handleAddIngredient}>
							add
						</button>
					</div>
				</label>
				<p>
					Current Ingredients:
					{ingredients.map((ing) => (
						<em key={uuid()}>{ing}, </em>
					))}
				</p>
				<label>
					<span>Cooking time: </span>
					<input type="number" onChange={handleTime} value={cookingTime} />
				</label>
				<label>
					<span>Method: </span>
					<textarea
						name=""
						id=""
						cols="30"
						rows="10"
						onChange={handleMethod}
						value={method}
					></textarea>
				</label>
				<button className="btn">submit</button>
			</form>
		</div>
	);
}

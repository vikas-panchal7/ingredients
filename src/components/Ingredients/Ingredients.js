import React, { useEffect, useReducer, useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const reducerfun = (currentingredients, action) => {
  switch (action.type) {
    case "SET":
      return action.Ingredients;
    case "ADD":
      return [...currentingredients, action.Ingredients];
    case "DELETE":
      return currentingredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Something Went Wrong");
  }
};
function Ingredients() {
  //using usereducer for ingredients manuplations
  const [useringredients, dispatch] = useReducer(reducerfun, []);
  //using usestate for ingredients manipulations
  // const [useringredients, setuseringredients] = useState([]);
  const [isloading, setisloading] = useState(false);
  useEffect(() => {
    setisloading(true);
    fetch("https://fir-3327e-default-rtdb.firebaseio.com/ingredients.json")
      .then((response) => {
        setisloading(false);
        return response.json();
      })
      .then((responseData) => {
        const LoadedIngredients = [];
        for (const key in responseData) {
          LoadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        //using usereducer for ingredients manuplations
        dispatch({ type: "SET", Ingredients: LoadedIngredients });

        ///using usestate for ingredients manipulations
        // setuseringredients(LoadedIngredients);
      });
  }, []);
  const addIngredientsHandler = (ingredients) => {
    setisloading(true);
    fetch("https://fir-3327e-default-rtdb.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredients),
      headers: { "Content-type": "application/json" },
    }).then((response) => {
      setisloading(false);
      //using usereducer for ingredients manuplations
      dispatch({
        type: "ADD",
        Ingredients: { id: response.name, ...ingredients },
      });

      //using usestate for ingredients manipulations
      // setuseringredients((prev) => [
      //   ...prev,
      //   { id: Math.random().toString(), ...ingredients },
      // ]);
    });
  };
  const removeIngredientsHandler = (ingredientId) => {
    setisloading(true);
    fetch(
      `https://fir-3327e-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      setisloading(false);
      //using usereducer for ingredients manuplations
      dispatch({ type: "DELETE", id: ingredientId });

      //using usestate for ingredients manipulations
      // setuseringredients((prev) =>
      //   prev.filter((ingredient) => ingredient.id !== ingredientId)
      // );
    });
  };
  return (
    <div className="App">
      <IngredientForm
        onAddIngredients={addIngredientsHandler}
        loding={isloading}
      />

      <section>
        <Search />
        {/* Need to add list here! */}
        <IngredientList
          ingredients={useringredients}
          onRemoveItem={removeIngredientsHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;

import React from 'react' 
import {withRouter} from 'react-router-dom'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
            // transfornedIngredients are the keys
            // first map creates an array of those keys
            // second map creates a BurgerIngredient with each element in array
            // key = Salad 1, type = Salad 
        });
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);

    if (transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

// need aacess to history and dont want to pass down use withRouter
export default withRouter(burger);
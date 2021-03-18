import React, { Component } from 'react'
import { connect } from 'react-redux'
import Aux from '../hoc/Aux'
import axios from '../axios-orders'
import Burger from '../components/Burger'
import BuildControls from '../components/BuildControls'
import Modal from '../components/Modal'
import OrderSummary from '../components/OrderSummary'

import Spinner from '../components/Spinner'
import withErrorHandler from '../hoc/withErrorHandler'
import * as actions from '../store/actions/index'


class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }
    
    state = {
        purchasing: false
    }

    componentDidMount () {
       this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum,el) => {
                return sum + el;
            }, 0);
        return sum > 0;

    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');

    }



    render() {
        const disableInfo = {
            ...this.props.ings
        }
        // copies object with boolean value true/false and pass to BuildControls
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0 
        }
        
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be Loaded!</p> : <Spinner />
        
        if (this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    {/* check build controls */}
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price} />;
        }

        

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
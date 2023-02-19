import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return (
            <div className="row text-center">
                <div className="filter-result col-lg-4">{this.props.count} products</div>
                <div className="filter-sort col-lg-4">order
                    <select value={this.props.sort} onChange={this.props.filterSort}>
                        <option>Latest</option>
                        <option value="Lowest">Lowest</option>
                        <option value="Highest">Highest</option>
                    </select>
                </div>
                <div className="filter-size col-lg-4">
                    filter
                    <select value={this.props.size} onChange={this.props.filterSize}>
                        <option value="">All</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
            </div>
        )
    }
}

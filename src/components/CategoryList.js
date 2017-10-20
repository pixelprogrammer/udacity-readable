import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import uuid from 'uuid/v4'

class CategoryList extends Component {

	render() {

		const {categories} = this.props
		return (
			categories.length > 0 && 
				<ul className="category-list">
					{categories.map((cat) => (
						<li key={uuid()} className="cat-item"><Link to={'/' + cat.path}>{cat.name}</Link></li>
					))}
				</ul>
			
		)
	}
}

export default CategoryList
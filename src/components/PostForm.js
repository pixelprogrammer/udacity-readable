import React, {Component} from 'react'
import uuid from 'uuid/v4'

class PostForm extends Component {

	render() {

		const {post, onSubmit, categories, hasSubmit} = this.props
		let actionPrefix = post.id ? 'edit' : 'add'
		let postId = post.id ? post.id : uuid()
		let submitLabel = post.id ? 'Save' : "Publish"
		return (
			<form id={actionPrefix + "-post-form"} className={actionPrefix + "-add-form"}>
				<input type="hidden" id={actionPrefix + "-post-id"} name="id" value={postId} />
				<input type="hidden" id={actionPrefix + "-post-timestamp"} name="timestamp" value={post.timestamp} />
				<div className="form-group">
					<input id={actionPrefix + "-post-title"} className="input-full" type="text" name="title" placeholder="Post Title" defaultValue={post.title}/>
				</div>
				<div className="form-group">
					<textarea id={actionPrefix + "-post-content"} className="input-full"  name="body" placeholder="Post Content" defaultValue={post.body}></textarea>
				</div>
				<div className="form-group">
					<input id={actionPrefix + "-post-author"} type="text" name="author" placeholder="Author" defaultValue={post.author} />
				</div>
				<div className="form-group">
					<select id={actionPrefix + "-post-category"} name="category" defaultValue={post.category} >
						<option value="">--Category--</option>
						{categories.map((category) => (
							<option key={uuid()} value={category.path}>{category.name}</option>
						))}
					</select>
				</div>
				{hasSubmit && (
					<div className="form-group">
						<input type="submit" name={actionPrefix + '_post_form_submit'} value={submitLabel} onClick={onSubmit} />
					</div>
				)}
			</form>
		)
	}
}

export default PostForm
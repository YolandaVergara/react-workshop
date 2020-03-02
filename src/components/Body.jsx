import React from 'react';
import CardPosts from './CardPost';
import CardFilter from './CardFilter';
import filters from '../data/filters';

const Body = ({ step, posts, image, filter, setFilter, setCaption, handleLikes }) => {

	return (
		<main>
			{step === 1
				&& <div className="posts">{posts.map((post, index) => <CardPosts key={post.id} post={post} />)}</div>}
			{step === 2
				&& <div className="filter-container">{filters.map((filter => <CardFilter key={filter.name} image={image} filter={filter} setFilter={setFilter} />))}</div>}
			{step === 3
				&&
				<>
					<div className="selected-image">
						<div className={filter}>
							<img className="img" src={image} alt="" />
						</div>
					</div>
					<div clas="caption-container">
						<textarea
							className="caption-input"
							type="text"
							onChange={(ev) => setCaption(ev.target.value)}
							placeholder="Write a caption..."
						>
						</textarea>
					</div>
				</>
			}
		</main>
	);
};

export default Body;
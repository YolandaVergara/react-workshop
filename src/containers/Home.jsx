import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import userImage from "../data/userImage";

const Home = () => {
	const [step, setStep] = useState(1);
	const [posts, setPosts] = useState([]);
	const [image, setImage] = useState("");
	const [filter, setFilter] = useState("");
	const [caption, setCaption] = useState("");
	const handleGoHome = () => setStep(1);
	const handleNext = () => setStep(step + 1);

	const getPosts = async () => {
		const res = await axios.get('http://localhost:3000/api/posts');
		setPosts(res.data);
	}
	useEffect(() => {
		getPosts();
	}, []);

	const handleUploadImage = (ev) => {
		const files = ev.target.files
		if (files.length) {
			const reader = new FileReader();
			reader.readAsDataURL(files[0]);
			reader.onload = (ev) => {
				setImage(ev.target.result);
				setStep(2);
			}
		}
	}
	const savePost = async () => {
		const url = 'localhost:3000/api/posts';
		const post = {
			username: 'ngm',
			userImage: userImage, //imagen guardada dentro de la carpta data
			hasBeenLiked: false,
			likes: 0,
			caption,
			filter,
			postImage: image,
		}
		const config = {
			method: 'post',
			url,
			data: post,
		}
		const res = await axios(config);
	}
	const handleLikes = async post => {
		const hasBeenLiked = !post.hasBeenLiked;
		const likes = hasBeenLiked ? post.likes + 1 : post.likes - 1;
		const config = {
			method: "put",
			url: `http://localhost:3000/api/posts/${post.id}`,
			data: { hasBeenLiked, likes }
		};
		const res = await axios(config);
		getPosts();
	};
	const handleShare = () => {
		const post = {
			username: "nodegirls",
			userImage,
			postImage: image,
			caption,
			filter,
			hasBeenLiked: false,
			likes: 0
		};
		const res = savePost(post);
		setStep(1);
		setTimeout(() => getPosts());
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<>
			<Header
				step={step}
				handleShare={handleShare}
				handleGoHome={handleGoHome}
				handleNext={handleNext}
			/>
			<Body
				step={step}
				posts={posts}
				image={image}
				filter={filter}
				setFilter={setFilter}
				setCaption={setCaption}
				handleLikes={handleLikes}
			/>
			<Footer
				step={step}
				handleGoHome={handleGoHome}
				handleUploadImage={handleUploadImage}
			/>
		</>
	)
}

export default Home;
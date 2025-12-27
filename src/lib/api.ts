export type Post = {
	id: number;
	title: string;
	body: string;
	tags: string[];
	reactions: {
		likes: number;
		dislikes: number;
	};
	views: number;
	userId: number;
};

export type User = {
	id: number;
	name: string;
	username: string;
	email: string;
};

export const fetchPosts = async (): Promise<Post[]> => {
	const response = await fetch('https://dummyjson.com/posts');

	if (!response.ok) {
		throw new Error('Some Error Occurred');
	}
	const data = await response.json();

	return data.posts;
};

export const fetchPostById = async (id: string): Promise<Post> => {
	const response = await fetch(`https://dummyjson.com/posts/${id}`);

	if (!response.ok) {
		throw new Error('Some Error Occurred');
	}

	const data = await response.json();
	return data;
};

export const fetchPostsByTag = async (tag: string): Promise<Post[]> => {
	const response = await fetch(`https://dummyjson.com/posts/tag/${tag}`);

	if (!response.ok) {
		throw new Error('Some Error Occurred');
	}

	const data = await response.json();
	return data.posts;
};

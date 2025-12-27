import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { fetchPostById } from '../lib/api';

export const Route = createFileRoute('/posts/$id')({
	component: PostDetailPage
});

function PostDetailPage() {
	const { id } = Route.useParams();

	const {
		data: post,
		isLoading,
		error
	} = useQuery({
		queryKey: ['post', id],
		queryFn: () => fetchPostById(id)
	});

	const handleGoBack = () => {
		window.history.back();
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!post) {
		return <div>Post not found</div>;
	}

	return (
		<div className="max-w-2xl mx-auto p-4">
			<button
				onClick={handleGoBack}
				className="mb-4 px-4 py-2 cursor-pointer bg-blue-200 hover:bg-blue-300 rounded-lg flex items-center gap-2 transition-colors"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
						clipRule="evenodd"
					/>
				</svg>
				Назад
			</button>
			<h1 className="text-3xl font-bold mb-4">{post.title}</h1>
			<p className="mb-4">{post.body}</p>
			<div className="mb-4">
				<p>Tags: {post.tags.join(', ')}</p>
				<p>
					{post.reactions.likes} likes | {post.reactions.dislikes} dislikes
				</p>
				<p>{post.views} views</p>
			</div>
		</div>
	);
}

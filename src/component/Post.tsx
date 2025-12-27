import { useNavigate } from '@tanstack/react-router';
import type { Post as PostType } from '../lib/api';

type PostProps = {
	post: PostType;
};

const Post = ({ post }: PostProps) => {
	const navigate = useNavigate();
	const { id, title, body, tags, reactions, views, userId } = post;

	const handleSelectTag = (e: React.MouseEvent, tag: string) => {
		e.stopPropagation(); // Останавливаем всплытие события
		navigate({ to: '/posts/tag/$tag', params: { tag: tag } });
	};

	const handlePostClick = () => {
		navigate({ to: '/posts/$id', params: { id: String(id) } });
	};

	return (
		<div
			onClick={handlePostClick}
			className="border-b border-blue-500 pb-4 max-w-2xl mx-auto overflow-hidden cursor-pointer"
		>
			<h2 className="text-2xl font-bold">{title}</h2>
			<p>{body}</p>
			<div className="flex gap-2 my-2">
				{tags.map(tag => (
					<button
						onClick={e => handleSelectTag(e, tag)}
						key={tag}
						className="px-2 py-1 cursor-pointer bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
					>
						#{tag}
					</button>
				))}
			</div>
			<p>
				{reactions.likes} likes, {reactions.dislikes} dislikes
			</p>
			<p>{views} views</p>
			<p>User ID: {userId}</p>
		</div>
	);
};

export default Post;

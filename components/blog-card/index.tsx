// components/BlogCard.tsx
"use client";
import Link from "next/link";

export interface BlogCardProps {
	image: string;
	avatar?: string;
	title: string;
	author?: string;
	date?: string;
	comments?: string;
	readTime?: string;
	category?: string;
	href: string;
	tagLink: string;
	showAuthor?: boolean;
	showDate?: boolean;
	showComments?: boolean;
	showReadTime?: boolean;
	showAvatar?: boolean;
}

export default function BlogCard({
	image,
	avatar,
	title,
	author,
	date,
	comments,
	readTime,
	category,
	href,
	tagLink,
	showAuthor = true,
	showDate = true,
	showComments = true,
	showReadTime = true,
	showAvatar = true,
}: BlogCardProps) {
	return (
		<div className="card-news background-card hover-up">
			<div className="card-image">
				<Link href={href}>
					<img src={image} alt="GraceTrans" />
				</Link>
			</div>
			<div className="card-info">
				<Link
					className="bg-2 rounded-12 position-absolute top-0 end-0 translate-middle-y px-3 py-2 me-4 text-sm-bold"
					href={tagLink}
				>
					{category}
				</Link>
				<div className="card-meta">
					{showDate && <span className="post-date neutral-1000">{date}</span>}
					{showReadTime && (
						<span className="post-time neutral-1000">{readTime}</span>
					)}
					{showComments && (
						<span className="post-comment neutral-1000">{comments}</span>
					)}
				</div>
				<div className="card-title">
					<Link className="text-xl-bold neutral-1000" href={href}>
						{title}
					</Link>
				</div>
				<div className="card-program">
					<div className="endtime">
						{showAuthor || showAvatar ? (
							<div className="card-author">
								{showAvatar && avatar && <img src={avatar} alt="" />}
								{showAuthor && (
									<p className="text-sm-bold neutral-1000">{author}</p>
								)}
							</div>
						) : null}
						<div className="card-button">
							<Link className="btn btn-gray" href={href}>
								Selanjutnya
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

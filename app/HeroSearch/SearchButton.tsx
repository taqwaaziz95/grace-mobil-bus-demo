import React from "react";
import Link from "next/link";

interface SearchButtonProps {
	category: string;
}

export default function SearchButton({ category }: SearchButtonProps) {
	return (
		<div className="item-search bd-none d-flex justify-content-end">
			<Link href={`/cars-list-1?category=${category}`}>
				<button className="btn btn-brand-2 text-nowrap">
					<svg
						className="me-2"
						width={20}
						height={20}
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M19 19L14.6569 14.6569M14.6569 14.6569C16.1046 13.2091 17 11.2091 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17C11.2091 17 13.2091 16.1046 14.6569 14.6569Z"
							stroke="#000"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<span className="text-white">Cari</span>
				</button>
			</Link>
		</div>
	);
}

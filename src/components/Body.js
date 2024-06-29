import React, { useEffect, useState } from "react";
import { useBookmarksContext } from "../BookmarksContext";

const Body = () => {
	// const { deleteBookmark } = useBookmarksContext();
	const [bookmarks, setBookmarks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBookmarks = async () => {
			try {
				const response = await fetch(
					"https://bookmark-keeper-default-rtdb.firebaseio.com/bookmarks.json"
				);
				if (response.ok) {
					const data = await response.json();
					if (data) {
						const bookmarksWithIds = Object.keys(data).map((key) => ({
							id: key,
							...data[key],
						}));
						setBookmarks(bookmarksWithIds);
					}
				} else {
					throw new Error("Failed to fetch bookmarks");
				}
			} catch (error) {
				console.error("Error fetching bookmarks:", error);
			} finally {
				setLoading(false); // Set loading to false after fetching
			}
		};

		fetchBookmarks(); // Fetch bookmarks when component mounts

		// Cleanup function (optional)
		return () => {
			// Any cleanup logic if needed
		};
	}, []); // Dependency array ensures it runs once on mount

	const handleDelete = (id) => {
		deleteBookmark(id);
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (bookmarks.length === 0) {
		return <div>No bookmarks available.</div>;
	}

	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">Bookmarks List</h2>
			<ul>
				{bookmarks.map((bookmark) => (
					<li key={bookmark.id} className="mb-2">
						<div className="flex justify-between items-center">
							<div>
								<h3 className="text-lg font-semibold">{bookmark.title}</h3>
								<p className="text-gray-600">{bookmark.url}</p>
							</div>
							<div>
								<button
									className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
									onClick={() => handleDelete(bookmark.id)}
								>
									Delete
								</button>
								{/* Add update functionality as needed */}
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Body;

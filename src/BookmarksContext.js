import React, { createContext, useContext, useState, useEffect } from "react";

const BookmarksContext = createContext();

export const useBookmarksContext = () => useContext(BookmarksContext);

const BookmarksProvider = ({ children }) => {
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
				setLoading(false);
			}
		};

		fetchBookmarks();
	}, []);

	const deleteBookmark = async (id) => {
		try {
			const response = await fetch(
				`https://bookmark-keeper-default-rtdb.firebaseio.com/bookmarks/${id}.json`,
				{
					method: "DELETE",
				}
			);
			if (response.ok) {
				setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
			} else {
				throw new Error("Failed to delete bookmark");
			}
		} catch (error) {
			console.error("Error deleting bookmark:", error);
		}
	};

	const editBookmark = async (id, updatedBookmark) => {
		try {
			const response = await fetch(
				`https://bookmark-keeper-default-rtdb.firebaseio.com/bookmarks/${id}.json`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(updatedBookmark),
				}
			);
			if (response.ok) {
				setBookmarks(
					bookmarks.map((bookmark) =>
						bookmark.id === id ? { id, ...updatedBookmark } : bookmark
					)
				);
			} else {
				throw new Error("Failed to edit bookmark");
			}
		} catch (error) {
			console.error("Error editing bookmark:", error);
		}
	};

	const contextValue = {
		bookmarks,
		deleteBookmark,
		editBookmark,
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<BookmarksContext.Provider value={contextValue}>
			{children}
		</BookmarksContext.Provider>
	);
};

export default BookmarksProvider;

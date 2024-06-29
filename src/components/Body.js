import React, { useState } from "react";
import { useBookmarksContext } from "../BookmarksContext";

const Body = () => {
	const { bookmarks, deleteBookmark, editBookmark, addBookmark } =
		useBookmarksContext();
	const [editing, setEditing] = useState(null);
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [updatedUrl, setUpdatedUrl] = useState("");
	const [newTitle, setNewTitle] = useState("");
	const [newUrl, setNewUrl] = useState("");

	const handleDelete = (id) => {
		deleteBookmark(id);
	};

	const handleEdit = (bookmark) => {
		setEditing(bookmark.id);
		setUpdatedTitle(bookmark.title);
		setUpdatedUrl(bookmark.url);
	};

	const handleSave = (id) => {
		editBookmark(id, { title: updatedTitle, url: updatedUrl });
		setEditing(null);
	};

	const handleAdd = () => {
		addBookmark({ title: newTitle, url: newUrl });
		setNewTitle("");
		setNewUrl("");
	};

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
							{editing === bookmark.id ? (
								<div>
									<input
										type="text"
										value={updatedTitle}
										onChange={(e) => setUpdatedTitle(e.target.value)}
										className="mr-2 p-1 border rounded"
									/>
									<input
										type="text"
										value={updatedUrl}
										onChange={(e) => setUpdatedUrl(e.target.value)}
										className="mr-2 p-1 border rounded"
									/>
									<button
										className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
										onClick={() => handleSave(bookmark.id)}
									>
										Save
									</button>
									<button
										className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md ml-2"
										onClick={() => setEditing(null)}
									>
										Cancel
									</button>
								</div>
							) : (
								<div>
									<h3 className="text-lg font-semibold">{bookmark.title}</h3>
									<p className="text-gray-600">{bookmark.url}</p>
								</div>
							)}
							<div>
								<button
									className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
									onClick={() => handleDelete(bookmark.id)}
								>
									Delete
								</button>
								<button
									className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md ml-2"
									onClick={() => handleEdit(bookmark)}
								>
									Edit
								</button>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Body;

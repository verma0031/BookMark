import React, { useState } from "react";

const Modal = ({ showModal, closeModal }) => {
	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const newBookmark = { title, url };
			const response = await fetch(
				"https://bookmark-keeper-default-rtdb.firebaseio.com/bookmarks.json",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newBookmark),
				}
			);
			if (response.ok) {
				console.log("Bookmark added successfully");
				setTitle("");
				setUrl("");
				closeModal();
			} else {
				console.error("Failed to add bookmark");
			}
		} catch (error) {
			console.error("Error adding bookmark:", error);
		}
	};

	return (
		<>
			{showModal && (
				<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
					<div className="bg-white p-6 rounded-lg w-1/2">
						<h2 className="text-2xl font-bold mb-4">Add New Website</h2>
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="title"
								>
									Title
								</label>
								<input
									type="text"
									id="title"
									className="border border-gray-300 rounded-sm px-3 py-2 w-full"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									required
								/>
							</div>
							<div className="mb-4">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="url"
								>
									URL
								</label>
								<input
									type="url"
									id="url"
									className="border border-gray-300 rounded-sm px-3 py-2 w-full"
									value={url}
									onChange={(e) => setUrl(e.target.value)}
									required
								/>
							</div>
							<div className="flex justify-end">
								<button
									type="submit"
									className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
								>
									Save
								</button>
								<button
									type="button"
									className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md ml-2"
									onClick={closeModal}
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;

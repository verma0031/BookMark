import React, { useState } from "react";
import Modal from "./Modal";

const Header = () => {
	const [showModal, setShowModal] = useState(false);

	const openModal = () => setShowModal(true);
	const closeModal = () => setShowModal(false);

	return (
		<div className="bg-blue-500 p-4 flex justify-between items-center">
			<h1 className="text-3xl font-bold text-white">BookMark Website</h1>
			<button
				className="bg-white text-blue-500 px-4 py-2 rounded-md ml-4"
				onClick={openModal}
			>
				Add New
			</button>
			<Modal showModal={showModal} closeModal={closeModal} />
		</div>
	);
};

export default Header;

"use client";

import {useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
    id: number;
    title: string;
    price: number;
  };

const DeleteProduct = (product: Product) => {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  const handleDelete = async (productId: number) => {
    setIsMutating(true);
    await fetch(`http://localhost:5000/products/${productId}`, {
      method: "DELETE", 
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);
  };

  const handleChange = () => {
    setModal(!modal);
  };

  return (
    <div>
      <button className="btn btn-error btn-sm" onClick={handleChange}>
        Delete
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className=" modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are sure to delete {product.title}?</h3>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="button" onClick={() => handleDelete(product.id)} className="btn btn-primary">
                  Delete
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Deleting...
                </button>
              )}
            </div>
        </div>
      </div>  
    </div>
  );
};

export default DeleteProduct;

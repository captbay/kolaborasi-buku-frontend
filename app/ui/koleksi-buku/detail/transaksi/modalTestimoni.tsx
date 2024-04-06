"use client";

import React from "react";
import { Modal, Rating } from "flowbite-react";
import { Button } from "@/app/ui/button";

export default function ModalTestimoni({
  openModal,
  onCloseModal,
  testimoniRef,
  rating,
  setRating,
  onClickAddTestimoni,
}: {
  openModal: boolean;
  onCloseModal: () => void;
  testimoniRef: React.RefObject<HTMLTextAreaElement>;
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  onClickAddTestimoni: () => void;
}) {
  return (
    <>
      <Modal show={openModal} onClose={onCloseModal}>
        <Modal.Header>Tambah Testimoni</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {/* input rating with star icon */}
            <Rating size="lg">
              {Array.from({ length: 5 }, (_, i) => (
                <Rating.Star
                  key={i}
                  filled={i < rating}
                  onClick={() => setRating(i + 1)}
                  aria-label={`Rating ${i + 1}`}
                />
              ))}
            </Rating>
            <textarea
              id="testimoni"
              rows={6}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Tulis testimoni anda disini..."
              ref={testimoniRef}
              required
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="w-full" onClick={onClickAddTestimoni}>
            Kirim
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

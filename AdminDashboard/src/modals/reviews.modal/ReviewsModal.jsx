import React from "react";
import { useContext } from "react";
import { MealContext } from "../../Contexts/MealContext";
import ReviewsTable from "./ReviewsTable";

function ReviewsModal() {
  const { meal, setMeal } = useContext(MealContext);
  console.log("mmmmeeeeeaaaaalllllll", meal);
  return (
    <dialog id="reviews_modal" className="modal">
      <div className="modal-box w-[60vw] h-[60vh]">
        <ReviewsTable meal={meal} />
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button
              onClick={() => {
                setMeal(null);
                document.getElementById("mealModal").close();
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default ReviewsModal;

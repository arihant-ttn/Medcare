"use client"
import { useState,useEffect } from "react";
import styles from './styles/reviews.module.css';
const ReviewSection = ({
    doctorId,
    initialReviews,
  }: {
    doctorId: number;
    initialReviews: string[];
  }) => {
    const [reviews, setReviews] = useState<string[]>(initialReviews);
    const [newReview, setNewReview] = useState("");
  
    // ✅ Submit Review Handler
    const handleReviewSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (!newReview.trim()) {
        alert("Please enter a valid review!");
        return;
      }
  
      const reviewData = {
        doctorId,
        review: newReview.trim(),
      };
  
      // ✅ Send review to API
      const res = await fetch("http://localhost:3000/addReview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
  
      if (res.ok) {
        // ✅ Update reviews dynamically
        setReviews((prev) => [...prev, newReview]);
        setNewReview("");
      } else {
        alert("Failed to submit review.");
      }
    };
  
    return (
      <div className={styles.reviews}>
        <strong>Patient Reviews:</strong>
        <ul>
          {reviews.length > 0 ? (
            reviews.map((review, index) => <li key={index}>⭐ {review}</li>)
          ) : (
            <li>No reviews yet.</li>
          )}
        </ul>
  
        {/* Add Review Form */}
        <form onSubmit={handleReviewSubmit} className={styles.reviewForm}>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review..."
            className={styles.reviewInput}
            rows={4}
          />
          <button type="submit" className={styles.submitBtn}>
            Submit Review
          </button>
        </form>
      </div>
    );
  };

  export default ReviewSection;
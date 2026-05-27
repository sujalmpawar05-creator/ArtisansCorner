import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  useEffect(() => {

    fetchProduct();

    fetchReviews();

  }, []);

  const fetchProduct = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(response.data.product);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchReviews = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/reviews/${id}`
      );

      setReviews(response.data.reviews);

    } catch (error) {

      console.log(error);

    }

  };

  const submitReview = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/reviews",
        {
          productId: id,
          rating,
          comment
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Review Added");

      fetchReviews();

      setComment("");

    } catch (error) {

      console.log(error);

      alert(
        error.response.data.message
      );

    }

  };

  if (!product) {

    return <h2>Loading...</h2>;

  }

  // Average Rating

  const averageRating =
    reviews.length > 0
    ?
    (
      reviews.reduce(
        (sum, review) =>
          sum + review.rating,
        0
      ) / reviews.length
    ).toFixed(1)
    :
    0;

  return (

    <div style={{ padding: "20px" }}>

      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "300px",
          height: "250px",
          objectFit: "cover"
        }}
      />

      <h1>{product.title}</h1>

      <p>{product.description}</p>

      <h2>₹ {product.price}</h2>

      <h3>
        Average Rating:
        {" "}
        {averageRating}
        ⭐
      </h3>

      <hr />

      <h2>Write Review</h2>

      <select
        value={rating}
        onChange={(e) =>
          setRating(e.target.value)
        }
      >

        <option value="1">1 Star</option>

        <option value="2">2 Stars</option>

        <option value="3">3 Stars</option>

        <option value="4">4 Stars</option>

        <option value="5">5 Stars</option>

      </select>

      <br /><br />

      <textarea
        placeholder="Write review"
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
      />

      <br /><br />

      <button onClick={submitReview}>
        Submit Review
      </button>

      <hr />

      <h2>Customer Reviews</h2>

      {
        reviews.length === 0
        ?
        <p>No Reviews Yet</p>
        :
        reviews.map((review) => (

          <div
            key={review._id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px"
            }}
          >

            <h4>
              Rating:
              {" "}
              {review.rating}
              ⭐
            </h4>

            <p>{review.comment}</p>

          </div>

        ))
      }

    </div>

  );

}

export default ProductDetails;
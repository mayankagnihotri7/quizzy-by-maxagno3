import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Public = () => {
  const { slug } = useParams();

  const fetchQuizDetails = async () => {
    await axios.get(`/public/${slug}`);
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  return (
    <div>
      <h1>This is public page</h1>
    </div>
  );
};

export default Public;

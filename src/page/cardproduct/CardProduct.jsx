import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchById } from "../../redux/features/blog/blogSlice";
import { useParams } from "react-router-dom";

function CardProduct() {
  const { id } = useParams();
  const { blog, status, error } = useSelector((state) => state.blog);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchById(id));
  }, [dispatch]);

  // Handle Drive URL - Customize this as needed
  // const driveUrl = "https://drive.google.com/your-link"; // Replace with actual drive URL

  return (
    <section className="max-w-full px-4 sm:px-6 lg:px-12 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex flex-col w-full lg:w-[43%]">
          <div className="flex flex-col text-gray-900">
            <h1 className="flex items-start text-4xl font-extrabold leading-tight text-center lg:text-left">
              <div
                loading="lazy"
                src={blog.iconUrl || "default_icon_url"}
                className="object-contain aspect-square w-[50px] lg:w-[80px] shrink-0 "
              />
              <span className="mt-4 lg:mt-0 text-xl lg:text-3xl font-semibold">
                {blog.title}
              </span>
            </h1>
            <div className="flex gap-4 mt-8 text-xl font-bold my-8">
              <img
                loading="lazy"
                src={blog.author?.profileUrl || "default_author_url"}
                alt={blog.author?.username || "Author"}
                className="object-contain aspect-[1.07] w-[45px] lg:w-[60px]"
              />
              <span>{blog.author?.username || "Unknown Author"}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-[57%]">
          <img
            loading="lazy"
            src={blog.thumbnail || "default_thumbnail_url"}
            alt="Article related image"
            className="object-contain w-full aspect-[1.5] mb-4"
          />
        </div>
      </div>

      <article className="mt-8">
        <p className="text-2xl leading-9 text-gray-500 mb-6">
          {blog.content || "Content not available."}
        </p>
        <img
          loading="lazy"
          src={blog.additionalImageUrl || "default_image_url"}
          alt="Illustration related to content"
          className="object-contain w-full aspect-[1.37] mb-8"
        />
      </article>
    </section>
  );
}

export default CardProduct;

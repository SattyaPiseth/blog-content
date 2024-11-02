// src/components/common/card/ProductCard.jsx
import React from "react";

const Card = ({ blogs }) => {
  return (
    <section className="bg-gray-2 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <SingleCard
              key={blog.id}
              image={blog.thumbnail}
              CardTitle={blog.title}
              titleHref={`#/blogs/${blog.id}`} // Assuming you want a link to the blog
              CardDescription={blog.content.substring(0, 100) + "..."} // Shorten content
              Button="View Details"
              btnHref={`#/blogs/${blog.id}`} // Link to full blog
              author={blog.author} // Pass author details to SingleCard
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Card;

const SingleCard = ({
  image,
  Button,
  CardDescription,
  CardTitle,
  titleHref,
  btnHref,
  author,
}) => {
  return (
    <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
      <img src={image} alt="Blog thumbnail" className="w-full" />
      <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
        <h3>
          <a
            href={titleHref}
            className="mb-4 block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
          >
            {CardTitle}
          </a>
        </h3>
        <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
          {CardDescription}
        </p>

        {author && (
          <div className="flex items-center justify-center mb-4">
            <img
              src={author.profileUrl}
              alt={`${author.username}'s profile`}
              className="w-10 h-10 rounded-full mr-2"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {author.username}
            </span>
          </div>
        )}

        {Button && (
          <a
            href={btnHref}
            className="inline-block rounded-full border border-gray-3 px-7 py-2 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6"
          >
            {Button}
          </a>
        )}
      </div>
    </div>
  );
};

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LikeIcon from "./Button/LikeIcon";
import BookmarkButton from "./Button/BookmarkButton";

const Card = ({ blogs }) => {
  return (
    <section className="bg-gray-2 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <SingleCard
              key={blog.id}
              image={blog.thumbnail}
              CardTitle={blog.title}
              titleHref={`/blogs/${blog.id}`}
              CardDescription={blog.content.substring(0, 100) + "..."}
              Button="Read"
              btnHref={`/blogs/${blog.id}`}
              author={blog.author}
              theme={blog.theme}
              date={blog.date}
              blogId={blog.id} // Pass blog ID for bookmarking
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const SingleCard = ({
  image,
  Button,
  CardDescription,
  CardTitle,
  titleHref,
  btnHref,
  author,
  theme,
  date,
  blogId,
}) => {
  return (
    <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
      <img
        src={image}
        alt="Blog thumbnail"
        className="w-full h-60 object-cover"
      />
      <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400 flex justify-between">
          {theme && (
            <span className="bg-gray-200 dark:bg-dark-3 px-3 py-1 rounded-md text-sm">
              {theme}
            </span>
          )}
          {date && <span>{new Date(date).toLocaleDateString()}</span>}
        </div>

        <h3>
          <Link
            to={titleHref}
            className="mb-4 block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
          >
            {CardTitle}
          </Link>
        </h3>
        <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
          {CardDescription}
        </p>
        <div className="flex gap-10 justify-center mt-4 px-5">
          {author && (
            <div className="flex items-center justify-center mt-5">
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
          <div className="flex gap-4 justify-center mt-5">
            {Button && (
              <Link
                to={btnHref}
                className="inline-block rounded-full border border-gray-3 px-7 py-2 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6"
              >
                {Button}
              </Link>
            )}
            {/* Like Icon */}
            <LikeIcon />
           <BookmarkButton />
            {/* Bookmark Icon */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

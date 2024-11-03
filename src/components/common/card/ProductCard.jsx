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
              titleHref={`#/blogs/${blog.id}`}
              CardDescription={blog.content.substring(0, 100) + "..."}
              Button="Read"
              btnHref={`#/blogs/${blog.id}`}
              author={blog.author}
              theme={blog.theme} // New theme prop
              date={blog.date} // New date prop
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
  theme,
  date,
}) => {
  return (
    <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
      <img src={image} alt="Blog thumbnail" className="w-full h-60 object-cover" />
      <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
        {/* Theme and Date Section */}
        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400 flex justify-between">
          {theme && <span className="bg-gray-200 dark:bg-dark-3 px-3 py-1 rounded-md text-sm">{theme}</span>}
          {date && <span>{new Date(date).toLocaleDateString()}</span>}
        </div>
        
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
          <div className="flex gap-4 justify-center mt-4">
            {Button && (
              <a
                href={btnHref}
                className="inline-block rounded-full border border-gray-3 px-7 py-2 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6"
              >
                {Button}
              </a>
            )}
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/db15df27ce58dba9cfe945803e23d22c3e4c08c4baaa252de7cd4a26827dbf02?placeholderIfAbsent=true&apiKey=91a4dbf22d714a40962aa33b33fe0fd6"
              alt="Social icon"
              className="object-contain shrink-0 my-auto w-5 aspect-[1.11]"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9fb6718387cf4f368800147fbe7f34ad8ffa421b93b62f6ae215f13472b3d29?placeholderIfAbsent=true&apiKey=91a4dbf22d714a40962aa33b33fe0fd6"
              alt="Social icon"
              className="object-contain shrink-0 w-6 aspect-square"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlogs } from '../../redux/features/blog/blogSlice';
import Navbar from '../../components/Layouts/NavbarAccount';
import { FooterComponent } from '../../components/Layouts/FooterComponent';
import Card from '../../components/common/card/ProductCard';
import BlogList from "../cardproduct/BlogList";

export default function CardAccount() {
  const dispatch = useDispatch();

  // Select blog state from Redux store
  const { blogs, status, error } = useSelector((state) => state.blog);

  // Fetch blogs on component mount
  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="mx-4 md:mx-10 lg:mx-16 py-5">
        <h1 className="text-2xl md:text-4xl font-bold text-center md:text-left">
          Hey, You dev here! Discover my stories and creative ideas.
        </h1>
      </div>

      {/* Recent Posts Section */}
      <div className="mx-4 md:mx-10 lg:mx-16">
        <h2 className="text-xl md:text-2xl font-bold my-5 text-center md:text-left">Popular Categories</h2>
        <BlogList />
        <h2 className="text-xl md:text-2xl font-bold my-5 text-center md:text-left">Recent Posts</h2>
        {status === 'loading' && <p className="text-center text-lg">Loading...</p>}
        {status === 'failed' && <p className="text-center text-red-500">Error: {error}</p>}
        {status === 'succeeded' && (
        <Card blogs={blogs}/>
        )}
      </div>

      
      <FooterComponent />
    </div>
  );
}

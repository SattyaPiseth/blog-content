import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchById } from "../../redux/features/blog/blogSlice";
import { useParams } from "react-router-dom";

function CardProduct() {
  const { id } = useParams();
  const { blog, status, error } = useSelector((state) => state.blog);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchById(id));
  }, [dispatch, id]);

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left Section */}
        <div className="flex flex-col w-full lg:w-[43%] gap-4">
          <div className="flex flex-col text-gray-900">
            <div className="flex items-start gap-4">
              <h1 className="text-2xl lg:text-4xl font-extrabold">
                {blog.title || "Blog Title"}
              </h1>
            </div>

            <div className="flex items-center gap-4 mt-8 text-lg lg:text-xl">
              <img
                loading="lazy"
                src={blog.author?.profileUrl || "default_author_url"}
                alt={blog.author?.username || "Author"}
                className="object-cover w-[45px] h-[45px] lg:w-[60px] lg:h-[60px] rounded-full"
              />
              <span>{blog.author?.username || "Unknown Author"}</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col w-full lg:w-[57%]">
          <img
            loading="lazy"
            src={blog.thumbnail || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAM1BMVEXp7vG6vsHs8fS3u77Fycy+wsXc4eTX3N/h5unT2NrHzM7N0tW1ubzu8/W7v8LBxcjl6uwx8f6JAAADy0lEQVR4nO2c23aDIBBFCQheUf//a6vRpEZuJgXj0LNXH7oaK3WXwXEQGAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwGnw9Hz7Et+Ds1ElpxoJaeGsHHqRHlkoKlJ0JbvbKQhRjCSs8FKcY+RuRVKQwqsTlUxShm9f8BGGU53cuvryHeXUyLnTj9++5hC8WJ2kv+2sTkR79Y4y9uuf2papKVYnxcWd8GpV0uj0aaxcnFx9lH04ESeMfLpZ2pLJW/obZzrhcGK2BSdmW3BitkXdyfxYz7mO2hZtJ7yqCznIoVUsXv8h7YSPzZJ2CtENZTQplJ1Mj0CbZ6CuiFUdI+yEt69PhUJGih+6Tni5L7qJJlJbZJ2MZu1A1FHuP2Sd7CPnTh+nLapOKtNIrIyOqhNe28puYvjXThp7KfKAE16FDqDqxF6x7sI1VK26wFCcmRMR6gOTEhG6P+XmJNRPtJrruqL0SSHrxD6ehJxwtZS6vVLIOrFP9wTuO1o95XnCh6qTj/ITrsSRQ8k6Ydbg8YYOV9tDhbO4QNaJbUrd301elXikkHUyZbLGc7F34m4bOI9z2ccUuk6Ybl+liMFXP9GGEme/IuxkfubZXKcofL+vVW8ocYUPZSfThRbdYkUIWftKj3YljjyFtBPGtWplL259UzJfZmoLHPeYQtvJMr0zjsxfnnYrsY4p1J0c+l1H4DzOaByfv5N9XhLsKfk7MfOSkJTsnYSVGANt7k50IHBsZ83ciSsv8faUjJxw821w303YLSUfJ7q+VbvPjit5eRs2Gyfzw0//usTkaODsz5yLk6mXTPTbnhLKS5xSMnGyKJnnMn4j4I3AWeie9e8cnGxmSh/h876S55CShZNtEX8Nn3eG1xyd6Nf59FnKsVQtXyf7qR5R6U96SU5OLG9dVB8pyceJbUJQvpOX5OdElx9dfs5OdMxVgnk4ibtwMgsnvI5oJA8nMceSTJxEHUvycBJ/ETZ5JwnWpZN3Yn1n+H874RJODr4LCidwAic74MQETkzgxAROTODEBE5MzDy2i763VEfcCVOlmr+UMr8J/8DxybpIjKyTlG3BidkWnJhtwYnZFpyYbcGJ2VZBwwkb18SqV6lb4usUyeX3NmTrJozzvy81j7S2Sd8l/4a27XeSFHH5jbqfG4OexvVDx7HjSTqu300Y+91p+BS6NuregKnQjn1gEiBCe6RcBl7K6AUCO0VFRMm89EK1RXKatoq4e+QJJN+N+r4jNQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzuIHpk8/wVCHmdcAAAAASUVORK5CYII="}
            alt="Article Thumbnail"
            className="object-cover w-full h-[300px] lg:h-[400px] rounded-md"
          />
        </div>
      </div>

      {/* Content Section */}
      <article className="mt-8">
        <p className="text-lg lg:text-2xl leading-7 lg:leading-9 text-gray-600 mb-6">
          {blog.content || "Content not available."}
        </p>
        {blog.additionalImageUrl && (
          <img
            loading="lazy"
            src={blog.additionalImageUrl}
            alt="Additional Illustration"
            className="object-cover w-full h-[250px] lg:h-[400px] rounded-md"
          />
        )}
      </article>
    </section>
  );
}

export default CardProduct;

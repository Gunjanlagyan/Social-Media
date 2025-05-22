import React, { useState } from "react";
import Input from "../Input";
import Rte from "../Rte";
import { useForm } from "react-hook-form";
import Select from "../Select";
import Button from "../Button";
import service from "../../Appwrite/Config";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loaderwithtext from "../Loaderwithtext";
const PostForm = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const userData = useSelector((status) => status.auth.userData);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const submit = async (data) => {
    setLoading(true);

    if (post) {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;
      if (file) {
        await service.deleteFile(post.featuredImage);
      }
      const dbpost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file?.$id,
      });
      if (dbpost) {
        navigate("/all-post");
      }
    } else {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;
      if (file) {
        const dbPost = await service.createPost({
          ...data,
          featuredImage: file.$id,
          userId: userData.$id,
          userName: userData.name,
        });
        if (dbPost) {
          navigate("/all-post");
        }
      }
    }
  };

  const slugTransform = (value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, "-");
    } else {
      return "";
    }
  };

  useEffect(() => {
    const { unsubscribe } = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => unsubscribe();
  }, [watch, slugTransform, setValue, userData, navigate]);

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/5">
          <Loaderwithtext text="Creating post..." />
        </div>
      )}
      <form
        className={`flex flex-col sm:flex-row gap-6 ${
          loading ? "blur-sm pointer-events-none" : ""
        }`}
        onSubmit={handleSubmit(submit)}
      >
        <div className="w-full sm:w-2/3 px-4 ">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          <p className="text-red-600 text-center">{errors.title?.message}</p>

          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.target.value), {
                shouldValidate: true,
              });
            }}
          />
          <p className="text-red-600 text-center">{errors.slug?.message}</p>
          <div className="overflow-x-auto whitespace-nowrap border-b border-gray-300 bg-gray-50 px-2 py-1 rounded-t-md">
            <Rte
              {...register("content")}
              label="Content :"
              name="content"
              defaultValue={getValues("content")}
              control={control}
            />
          </div>
        </div>

        <div className="w-full sm:w-1/3 px-4 mb-4">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", {
              required: {
                value: !post,
                message: "This field is required",
              },
            })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={service.getFileView(post.featuredImage)}
                alt={post.title}
                className="rounded-lg w-full object-cover"
              />
            </div>
          )}
          <p className="text-red-600 text-center">{errors.image?.message}</p>

          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          <p className="text-red-600 text-center">{errors.select?.message}</p>

          <Button type="submit">{post ? "Update" : "Create Post"}</Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;

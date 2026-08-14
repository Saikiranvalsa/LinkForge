import React, { useState } from "react";
import { useStoreContext } from "../../contextApi/ContextApi";
import { useForm } from "react-hook-form";
import TextField from "../TextField";
import { Tooltip } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { FaLink } from "react-icons/fa";
import api from "../../api/api";
import toast from "react-hot-toast";

const CreateNewShorten = ({ setOpen, refetch }) => {
  const { token } = useStoreContext();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: "",
    },
    mode: "onTouched",
  });

  const createShortUrlHandler = async (data) => {
    setLoading(true);

    try {
      const { data: res } = await api.post(
        "/api/urls/shorten",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      const shortenUrl =
        `${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${res.shortUrl}`;

      navigator.clipboard.writeText(shortenUrl).then(() => {
        toast.success("Short URL Copied to Clipboard", {
          position: "bottom-center",
          className: "mb-5",
          duration: 3000,
        });
      });

      // await refetch();

      reset();
      setOpen(false);

    } catch (error) {
      console.log("CREATE SHORT URL ERROR:", error);

      toast.error("Create Short URL Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-transparent">

      <form
        onSubmit={handleSubmit(createShortUrlHandler)}
        className="
          relative
          w-[92vw]
          sm:w-[450px]
          bg-white
          border
          border-slate-200
          shadow-2xl
          shadow-slate-900/10
          rounded-2xl
          p-6
          sm:p-8
        "
      >

        {/* Close Button */}
        {!loading && (
          <Tooltip title="Close">
            <button
              type="button"
              disabled={loading}
              onClick={() => setOpen(false)}
              className="
                absolute
                right-4
                top-4
                w-9
                h-9
                flex
                items-center
                justify-center
                rounded-lg
                text-slate-400
                hover:text-slate-700
                hover:bg-slate-100
                transition-all
                duration-200
              "
            >
              <RxCross2 className="text-2xl" />
            </button>
          </Tooltip>
        )}

        {/* Icon */}
        <div className="flex justify-center mb-4">

          <div className="
            w-14
            h-14
            rounded-2xl
            bg-blue-50
            flex
            items-center
            justify-center
          ">
            <FaLink className="text-blue-600 text-xl" />
          </div>

        </div>

        {/* Heading */}
        <div className="text-center">

          <h1 className="
            text-slate-900
            font-bold
            text-2xl
            sm:text-3xl
          ">
            Create Short Link
          </h1>

          <p className="
            text-slate-500
            text-sm
            mt-2
            leading-6
          ">
            Enter your long URL and LinkForge will create a short,
            shareable link for you.
          </p>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 my-6" />

        {/* URL Field */}
        <div>

          <TextField
            label="Original URL"
            required
            id="originalUrl"
            placeholder="https://example.com"
            type="url"
            message="URL is required"
            register={register}
            errors={errors}
          />

        </div>

        {/* Create Button */}
        <button
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-semibold
            py-3
            rounded-xl
            mt-5
            shadow-lg
            shadow-blue-600/20
            transition-all
            duration-200
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Short Link"}
        </button>

        {/* Bottom Text */}
        <p className="
          text-center
          text-xs
          text-slate-400
          mt-4
        ">
          Your shortened URL will be copied automatically.
        </p>

      </form>
    </div>
  );
};

export default CreateNewShorten;
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import CopyToClipboard from "react-copy-to-clipboard";

import {
  FaExternalLinkAlt,
  FaRegCalendarAlt,
} from "react-icons/fa";

import { IoCopy } from "react-icons/io5";
import { LiaCheckSolid } from "react-icons/lia";
import {
  MdAnalytics,
  MdOutlineAdsClick,
} from "react-icons/md";

import { Hourglass } from "react-loader-spinner";

import { Link, useNavigate } from "react-router-dom";

import api from "../../api/api";
import { useStoreContext } from "../../contextApi/ContextApi";

import Graph from "./Graph";

const ShortenItem = ({
  originalUrl,
  shortUrl,
  clickCount,
  createdDate,
}) => {
  const { token } = useStoreContext();

  const navigate = useNavigate();

  const [isCopied, setIsCopied] = useState(false);
  const [analyticToggle, setAnalyticToggle] = useState(false);
  const [loader, setLoader] = useState(false);

  const [selectedUrl, setSelectedUrl] = useState("");
  const [analyticsData, setAnalyticsData] = useState([]);

  // Remove https:// or http:// for displaying the URL
  const subDomain =
    import.meta.env.VITE_REACT_FRONT_END_URL.replace(
      /^https?:\/\//,
      ""
    );

  // ==============================
  // ANALYTICS BUTTON
  // ==============================

  const analyticsHandler = (shortUrl) => {
    if (!analyticToggle) {
      setSelectedUrl(shortUrl);
    }

    setAnalyticToggle(!analyticToggle);
  };

  // ==============================
  // FETCH ANALYTICS
  // ==============================

  const fetchMyShortUrl = async () => {
    setLoader(true);

    try {
      const { data } = await api.get(
        `/api/urls/analytics/${selectedUrl}?startDate=2024-12-01T00:00:00&endDate=2025-12-31T23:59:59`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",

            // IMPORTANT:
            // token contains ONLY JWT
            // We add "Bearer " here
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log("ANALYTICS RESPONSE:", data);

      setAnalyticsData(data);

      setSelectedUrl("");

    } catch (error) {
      console.log("Analytics Error:", error);

      navigate("/error");

    } finally {
      setLoader(false);
    }
  };

  // ==============================
  // FETCH WHEN SELECTED URL CHANGES
  // ==============================

  useEffect(() => {
    if (selectedUrl && token) {
      fetchMyShortUrl();
    }
  }, [selectedUrl, token]);

  // ==============================
  // FULL URL
  // ==============================

  const fullShortUrl =
    `${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${shortUrl}`;

  return (
    <div className="bg-slate-100 shadow-lg border border-dotted border-slate-500 px-6 sm:py-1 py-3 rounded-md transition-all duration-100">

      {/* ========================================= */}
      {/* SHORT URL INFORMATION */}
      {/* ========================================= */}

      <div className="flex sm:flex-row flex-col sm:justify-between w-full sm:gap-0 gap-5 py-5">

        <div className="flex-1 sm:space-y-1 max-w-full overflow-x-auto overflow-y-hidden">

          {/* SHORT URL */}

          <div className="text-slate-900 pb-1 sm:pb-0 flex items-center gap-2">

            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="text-[17px] font-montserrat font-[600] text-linkColor"
              to={fullShortUrl}
            >
              {subDomain + "/s/" + shortUrl}
            </Link>

            <FaExternalLinkAlt className="text-linkColor" />

          </div>


          {/* ORIGINAL URL */}

          <div className="flex items-center gap-1">

            <h3 className="text-slate-700 font-[400] text-[17px]">
              {originalUrl}
            </h3>

          </div>


          {/* CLICK COUNT + CREATED DATE */}

          <div className="flex items-center gap-8 pt-6">

            {/* CLICK COUNT */}

            <div className="flex gap-1 items-center font-semibold text-green-800">

              <MdOutlineAdsClick className="text-[22px] me-1" />

              <span className="text-[16px]">
                {clickCount}
              </span>

              <span className="text-[15px]">
                {clickCount === 0 || clickCount === 1
                  ? "Click"
                  : "Clicks"}
              </span>

            </div>


            {/* CREATED DATE */}

            <div className="flex items-center gap-2 font-semibold text-lg text-slate-800">

              <FaRegCalendarAlt />

              <span className="text-[17px]">
                {dayjs(createdDate).format("MMM DD, YYYY")}
              </span>

            </div>

          </div>

        </div>


        {/* ========================================= */}
        {/* COPY + ANALYTICS BUTTONS */}
        {/* ========================================= */}

        <div className="flex flex-1 sm:justify-end items-center gap-4">

          {/* COPY */}

          <CopyToClipboard
            onCopy={() => {
              setIsCopied(true);

              setTimeout(() => {
                setIsCopied(false);
              }, 3000);
            }}
            text={fullShortUrl}
          >

            <div className="flex cursor-pointer gap-1 items-center bg-btnColor py-2 font-semibold shadow-md shadow-slate-500 px-6 rounded-md text-white">

              <button type="button">
                {isCopied ? "Copied" : "Copy"}
              </button>

              {isCopied ? (
                <LiaCheckSolid className="text-md" />
              ) : (
                <IoCopy className="text-md" />
              )}

            </div>

          </CopyToClipboard>


          {/* ANALYTICS */}

          <div
            onClick={() => analyticsHandler(shortUrl)}
            className="flex cursor-pointer gap-1 items-center bg-rose-700 py-2 font-semibold shadow-md shadow-slate-500 px-6 rounded-md text-white"
          >

            <button type="button">
              Analytics
            </button>

            <MdAnalytics className="text-md" />

          </div>

        </div>

      </div>


      {/* ========================================= */}
      {/* ANALYTICS GRAPH */}
      {/* ========================================= */}

      <React.Fragment>

        <div
          className={`${
            analyticToggle ? "flex" : "hidden"
          } max-h-96 sm:mt-0 mt-5 min-h-96 relative border-t-2 w-full overflow-hidden`}
        >

          {/* LOADING */}

          {loader ? (

            <div className="min-h-[calc(450px-140px)] flex justify-center items-center w-full">

              <div className="flex flex-col items-center gap-1">

                <Hourglass
                  visible={true}
                  height="50"
                  width="50"
                  ariaLabel="hourglass-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  colors={["#306cce", "#72a1ed"]}
                />

                <p className="text-slate-700">
                  Please Wait...
                </p>

              </div>

            </div>

          ) : (

            <>
              {/* NO DATA */}

              {analyticsData.length === 0 && (

                <div className="absolute flex flex-col justify-center sm:items-center items-end w-full left-0 top-0 bottom-0 right-0 m-auto">

                  <h1 className="text-slate-800 font-serif sm:text-2xl text-[15px] font-bold mb-1">
                    No Data For This Time Period
                  </h1>

                  <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-[12px] text-slate-600">

                    Share your short link to view where your engagements are
                    coming from

                  </h3>

                </div>

              )}

              {/* GRAPH */}

              <Graph graphData={analyticsData} />

            </>

          )}

        </div>

      </React.Fragment>

    </div>
  );
};

export default ShortenItem;
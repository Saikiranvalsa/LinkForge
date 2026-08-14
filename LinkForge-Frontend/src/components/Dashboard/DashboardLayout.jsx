import React, { useEffect, useState } from "react";
import Graph from "./Graph";
import { useStoreContext } from "../../contextApi/ContextApi";
import {
  useFetchMyShortUrls,
  useFetchTotalClicks,
} from "../../hooks/useQuery";
import ShortenPopUp from "./ShortenPopUp";
import { FaLink, FaPlus, FaChartLine } from "react-icons/fa";
import ShortenUrlList from "./ShortenUrlList";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../Loader";

const DashboardLayout = () => {
  const { token } = useStoreContext();

  const navigate = useNavigate();
  const location = useLocation();

  // Open popup automatically when coming from
  // Landing Page -> Create Short Link
  const [shortenPopUp, setShortenPopUp] = useState(
    location.state?.openCreateShortUrl || false
  );

  // Clear navigation state after opening popup
  useEffect(() => {
    if (location.state?.openCreateShortUrl) {
      navigate("/dashboard", {
        replace: true,
        state: {},
      });
    }
  }, [location, navigate]);

  const {
    isLoading,
    data: myShortenUrls,
    refetch,
  } = useFetchMyShortUrls(token, onError);

  const {
    isLoading: loader,
    data: totalClicks,
  } = useFetchTotalClicks(token, onError);

  function onError() {
    navigate("/error");
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 sm:px-8 lg:px-14">

      {/* ================= LOADER ================= */}

      {loader ? (
        <Loader />
      ) : (

        <div className="max-w-7xl w-full mx-auto py-8 sm:py-12">

          {/* ================= DASHBOARD HEADER ================= */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">

            <div>

              <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold mb-2">
                <FaChartLine />
                <span>LinkForge Analytics</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Dashboard
              </h1>

              <p className="text-slate-500 mt-2">
                Manage your shortened URLs and monitor their performance.
              </p>

            </div>

            {/* Create Short URL Button */}

            <button
              onClick={() => setShortenPopUp(true)}
              className="
                flex
                items-center
                justify-center
                gap-2
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-semibold
                px-5
                py-3
                rounded-xl
                shadow-lg
                shadow-blue-600/20
                transition-all
                duration-200
                hover:-translate-y-0.5
              "
            >
              <FaPlus className="text-sm" />

              Create Short URL
            </button>

          </div>


          {/* ================= ANALYTICS CARD ================= */}

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-2xl
              shadow-sm
              overflow-hidden
            "
          >

            {/* Analytics Header */}

            <div className="px-5 sm:px-7 pt-6">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <div>

                  <div className="flex items-center gap-2">

                    <div
                      className="
                        w-9
                        h-9
                        rounded-lg
                        bg-blue-50
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <FaChartLine className="text-blue-600" />
                    </div>

                    <div>

                      <h2 className="text-xl font-bold text-slate-900">
                        Click Analytics
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        Track clicks on your shortened URLs.
                      </p>

                    </div>

                  </div>

                </div>

                {/* Total Click Indicator */}

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-slate-500
                    bg-slate-50
                    px-3
                    py-2
                    rounded-lg
                    w-fit
                  "
                >
                  <span className="w-2 h-2 rounded-full bg-blue-600" />

                  Total Clicks
                </div>

              </div>

            </div>


            {/* Graph */}

            <div className="h-[400px] p-4 sm:p-6 relative">

              {totalClicks.length === 0 && (

                <div
                  className="
                    absolute
                    flex
                    flex-col
                    justify-center
                    items-center
                    w-full
                    left-0
                    top-0
                    bottom-0
                    right-0
                    m-auto
                    pointer-events-none
                    z-10
                  "
                >

                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-slate-100
                      flex
                      items-center
                      justify-center
                      mb-4
                    "
                  >
                    <FaChartLine className="text-slate-400 text-xl" />
                  </div>

                  <h1
                    className="
                      text-slate-800
                      sm:text-2xl
                      text-[18px]
                      font-bold
                      mb-1
                    "
                  >
                    No Data For This Time Period
                  </h1>

                  <h3
                    className="
                      sm:w-96
                      w-[90%]
                      text-center
                      sm:text-lg
                      text-sm
                      text-slate-500
                    "
                  >
                    Share your short link to view your click activity.
                  </h3>

                </div>

              )}

              <Graph graphData={totalClicks} />

            </div>

          </div>


          {/* ================= MY LINKS SECTION ================= */}

          <div className="mt-10">

            {/* Section Header */}

            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-end
                sm:justify-between
                gap-3
                mb-5
              "
            >

              <div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-blue-600
                    text-sm
                    font-semibold
                    mb-1
                  "
                >
                  <FaLink />

                  <span>Your Links</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  My Short URLs
                </h2>

                <p className="text-slate-500 text-sm mt-1">
                  View and manage all your shortened URLs.
                </p>

              </div>


              {/* Number of Links */}

              <div
                className="
                  bg-white
                  border
                  border-slate-200
                  px-4
                  py-2
                  rounded-lg
                  text-sm
                  text-slate-500
                  w-fit
                "
              >
                <span className="font-semibold text-slate-800">
                  {myShortenUrls?.length || 0}
                </span>{" "}
                {myShortenUrls?.length === 1 ? "Link" : "Links"}
              </div>

            </div>


            {/* ================= URL LIST ================= */}

            <div>

              {!isLoading && myShortenUrls.length === 0 ? (

                /* Empty State */

                <div
                  className="
                    bg-white
                    border
                    border-dashed
                    border-slate-300
                    rounded-2xl
                    py-14
                    px-5
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                  "
                >

                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-blue-50
                      flex
                      items-center
                      justify-center
                      mb-4
                    "
                  >
                    <FaLink className="text-blue-600 text-xl" />
                  </div>

                  <h1
                    className="
                      text-slate-800
                      text-lg
                      sm:text-xl
                      font-bold
                    "
                  >
                    No short links yet
                  </h1>

                  <p
                    className="
                      text-slate-500
                      text-sm
                      mt-2
                      max-w-sm
                    "
                  >
                    Create your first short URL to start managing your links
                    and tracking click activity.
                  </p>

                  <button
                    onClick={() => setShortenPopUp(true)}
                    className="
                      mt-5
                      flex
                      items-center
                      gap-2
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      font-semibold
                      px-5
                      py-2.5
                      rounded-xl
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                    "
                  >
                    <FaPlus className="text-xs" />

                    Create Short URL
                  </button>

                </div>

              ) : (

                /* Existing Links */

                <ShortenUrlList
                  data={myShortenUrls}
                />

              )}

            </div>

          </div>

        </div>
      )}


      {/* ================= CREATE SHORT URL POPUP ================= */}

      <ShortenPopUp
        refetch={refetch}
        open={shortenPopUp}
        setOpen={setShortenPopUp}
      />

    </div>
  );
};

export default DashboardLayout;
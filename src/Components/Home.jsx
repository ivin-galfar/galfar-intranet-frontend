import { useContext, useEffect } from "react";
import galfarlogo from "../assets/Images/banner_2.jpg";
import { AppContext } from "./Context";
import fetchStatments from "../APIs/StatementsApi";
import useUserInfo from "../CustomHooks/useUserInfo";
import { Link } from "react-router-dom";
import { MdOutlinePendingActions } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { FaBell } from "react-icons/fa";
import { GrDocumentStore } from "react-icons/gr";
import { SiQuicktime } from "react-icons/si";
import { IoDocumentText, IoWarningOutline } from "react-icons/io5";
import fetchParticulars from "../APIs/ParticularsApi";

const Home = () => {
  const {
    setReceipts,
    receipts,
    setMrno,
    setAllReceipts,
    allreceipts,
    setStatusFilter,
    setMultiStatusFilter,
    particulars,
    setNewMr,
    setParticulars,
    setParticularName,
    setfreezeQuantity,
  } = useContext(AppContext);
  const userInfo = useUserInfo();
  const statusMapping = {
    Initiator: [
      "Pending for HOD",
      "Pending for GM",
      "Pending for CEO",
      "Approved",
      "Rejected",
      "",
    ],
    HOD: [
      "Pending for HOD",
      "Pending for GM",
      "Pending for CEO",
      "Rejected",
      "Approved",
    ],
    GM: [
      "Pending for GM",
      "Pending for HOD",
      "Pending for CEO",
      "Approved",
      "Rejected",
    ],
    CEO: [
      "Pending for GM",
      "Pending for HOD",
      "Pending for CEO",
      "Approved",
      "Rejected",
    ],
  };
  useEffect(() => {
    const loadParticulars = async () => {
      try {
        const particulars = await fetchParticulars();
        setParticulars(particulars.Particulars);
        setfreezeQuantity(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadParticulars();
  }, []);
  const expectedStatuses = (statusMapping[userInfo?.role] || []).map((s) =>
    s.toLowerCase()
  );
  const pendingStatuses = !userInfo?.is_admin
    ? expectedStatuses.filter(
        (s) =>
          s.startsWith("pending") && s.includes(userInfo?.role.toLowerCase())
      )
    : expectedStatuses.filter((s) => s.startsWith("pending"));

  useEffect(() => {
    const fetchStatementsdetails = async () => {
      try {
        const { filteredReceipts, categorizedReceipts, mrValues } =
          await fetchStatments({
            expectedStatuses,
            userInfo,
          });

        setAllReceipts(filteredReceipts);
        setReceipts(categorizedReceipts);
        setMrno(mrValues);
      } catch (error) {
        const message = error?.response?.data?.message || error.message;
        console.error("Fetch receipts error:", message);
      }
    };
    fetchStatementsdetails();
  }, []);

  const approvedReceipts = allreceipts?.filter(
    (r) => r?.formData?.status == "Approved"
  );
  const rejectedReceipts = allreceipts?.filter(
    (r) => r?.formData?.status == "Rejected"
  );
  const pendingReceipts = !userInfo?.is_admin
    ? allreceipts?.filter(
        (r) =>
          r?.formData?.status?.toLowerCase().startsWith("pending") &&
          r?.formData?.status
            ?.toLowerCase()
            .includes(userInfo?.role.toLowerCase())
      )
    : allreceipts?.filter((r) =>
        r?.formData?.status?.toLowerCase().startsWith("pending")
      );

  const reviewReceipts = allreceipts?.filter(
    (r) => r?.formData?.status == "review"
  );

  const today = new Date();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 3);

  const recentReceipts = receipts.filter((r) => {
    const created = new Date(r.formData.created_at);
    return created >= sevenDaysAgo;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <img
        src={galfarlogo}
        alt="Galfar Logo"
        className="w-full  object-cover  h-full sticky"
      />
      <div className="flex gap-6 ml-10 mt-5">
        <div className="w-1/3 p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between">
            <h2 className="flex text-lg font-semibold mb-4  gap-2 items-center">
              <SiQuicktime />
              Quick Links
            </h2>
            <Link
              to="/dashboard"
              className="relative inline-flex ml-auto cursor-pointer"
              onClick={() => {
                if (userInfo?.is_admin) {
                  setStatusFilter("review");
                  setMultiStatusFilter([]);
                } else {
                  setStatusFilter("");
                  setMultiStatusFilter(pendingStatuses);
                }
              }}
            >
              <FaBell size={22} className="text-gray-700" />
              {(userInfo?.is_admin
                ? reviewReceipts?.length > 0
                : pendingReceipts.length > 0) && (
                <span
                  className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold 
             rounded-full w-4 h-4 flex items-center justify-center shadow-md animate-pulse-highlight"
                >
                  {!userInfo.is_admin
                    ? pendingReceipts.length
                    : reviewReceipts?.length}
                </span>
              )}
            </Link>
          </div>
          <ul className="p-2 space-y-3 ">
            {userInfo?.is_admin ? (
              <li>
                <Link to="/dashboard">
                  <button
                    className="w-full flex text-left px-3 py-2 justify-between bg-cyan-300 hover:bg-cyan-400 rounded font-medium cursor-pointer"
                    onClick={() => {
                      setStatusFilter("review");
                      setMultiStatusFilter([]);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <IoWarningOutline size={18} />
                      <span>Under Review</span>
                    </div>
                    <p>{reviewReceipts?.length}</p>
                  </button>
                </Link>
              </li>
            ) : (
              ""
            )}
            <li>
              <Link to="/dashboard">
                <button
                  className="w-full flex text-left px-3 py-2 justify-between bg-blue-200 hover:bg-blue-300 rounded font-medium cursor-pointer"
                  onClick={() => {
                    setStatusFilter("");
                    setMultiStatusFilter(pendingStatuses);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <MdOutlinePendingActions />
                    <span>Pending Statements</span>
                  </div>
                  <p>{pendingReceipts?.length}</p>
                </button>
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <button
                  className="w-full text-left px-3 py-2 justify-between flex bg-green-200 hover:bg-green-300 rounded font-medium cursor-pointer"
                  onClick={() => {
                    setStatusFilter("Approved");
                    setMultiStatusFilter([]);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <TiTick />
                    Approved Statements
                  </div>
                  <p>{approvedReceipts?.length}</p>
                </button>
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <button
                  className="w-full text-left px-3 py-2 justify-between flex bg-red-200 hover:bg-red-300 rounded font-medium cursor-pointer"
                  onClick={() => {
                    setStatusFilter("Rejected");
                    setMultiStatusFilter([]);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <ImCross />
                    Rejected Statements
                  </div>
                  <p>{rejectedReceipts?.length}</p>
                </button>
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <button
                  className="w-full text-left px-3 py-2 bg-gray-100 justify-between flex hover:bg-gray-200 rounded font-medium cursor-pointer"
                  onClick={() => {
                    setStatusFilter("All");
                    setMultiStatusFilter([]);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <GrDocumentStore />
                    All Statements
                  </div>
                  <p>{receipts?.length}</p>
                </button>
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-1/3 p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg  font-semibold mb-4 flex gap-2 items-center">
            {" "}
            <IoDocumentText />
            <div className="flex justify-between items-center w-full">
              <h2 className="text-base font-medium text-gray-700">
                Recent Statements
              </h2>
              {userInfo?.is_admin ? (
                <Link to="/receipts">
                  <button
                    className="border border-blue-500 text-blue-500 hover:bg-blue-50 text-sm px-3 py-1.5 rounded cursor-pointer"
                    onClick={() => {
                      (setNewMr(true),
                        setParticularName(particulars[0]?.id),
                        setNewMr(true));
                    }}
                  >
                    Create New Statement
                  </button>
                </Link>
              ) : (
                ""
              )}
            </div>
          </h2>
          <ul className="space-y-3 max-h-64 overflow-y-auto text-gray-700">
            {recentReceipts.length > 0 ? (
              recentReceipts.map((r, index) => (
                <div
                  key={r.id || index}
                  className="p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200 flex justify-between items-start"
                >
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-900">
                      {r.formData.hiringname}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(r.formData.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      r.formData.status
                        ? r.formData.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : r.formData.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        : ""
                    }`}
                  >
                    {r.formData.status || "--"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No recent receipts</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;

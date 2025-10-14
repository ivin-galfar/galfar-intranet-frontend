import axios from "axios";
import { REACT_SERVER_URL } from "../../config/ENV";

export const loginUser = async ({ email, password }) => {
  const config = {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  const { data } = await axios.post(
    `${REACT_SERVER_URL}/users/login`,
    {
      email,
      password,
    },
    config
  );
  return data;
};

export const registerUser = async ({ email, password }) => {
  const config = {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  const { data } = await axios.post(
    `${REACT_SERVER_URL}/users/register`,
    {
      email,
      password,
    },
    config
  );
  return data;
};

export const feedReceipt = async ({ sharedTableData, userInfo }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const { data } = await axios.post(
    `${REACT_SERVER_URL}/receipts`,
    {
      formData: sharedTableData.formData,
      tableData: sharedTableData["tableData"],
    },
    config
  );
  return data;
};

export const updateReceipt = async ({
  sharedTableData,
  selectedvendorindex,
  selectedvendorreason,
  userInfo,
}) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const { data } = await axios.put(
    `${REACT_SERVER_URL}/receipts/updatereceipt/${sharedTableData.formData.id}`,
    {
      formData: sharedTableData.formData,
      tableData: sharedTableData["tableData"],
      selectedIndex: selectedvendorindex,
      selectedReason: selectedvendorreason,
    },
    config
  );
  return data;
};

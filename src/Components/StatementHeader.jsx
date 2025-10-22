import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { FaPlus } from "react-icons/fa";
import {
  useAllParticulars,
  useNewStatement,
  useParticular,
  useParticularValues,
  useStatement,
} from "../store/logisticsStore";
import fetchParticulars from "../APIs/ParticularsApi";
import useUserInfo from "../CustomHooks/useUserInfo";
import axios from "axios";
import { REACT_SERVER_URL } from "../../config/ENV";

const StatementHeader = () => {
  const userInfo = useUserInfo();
  const form = useForm({
    defaultValues: {
      cargo_details: "",
      gross_weight: "",
      chargeable_weight: "",
      description: "",
      supplier: "",
      scopeofwork: "",
      mode: "",
      date: "",
      po: "",
      project: "",
    },
  });
  const { newstatement, setNewStatement } = useNewStatement();
  const { particulars, setParticulars } = useAllParticulars();
  const { particular, setParticular } = useParticular();
  const { setParticularValue } = useParticularValues();
  const { setFormData } = useStatement();

  let dept_id = Array.isArray(userInfo.dept_code)
    ? userInfo.dept_code.includes(2)
      ? 2
      : userInfo.dept_code[0]
    : userInfo.dept_code;

  useEffect(() => {
    const fetchParticularsData = async () => {
      try {
        const allParticulars = await fetchParticulars(userInfo, dept_id);
        setParticulars(allParticulars.Particulars);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchparticularvalues = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const response = await axios.get(
          `${REACT_SERVER_URL}/particulars/${particular}`,
          config
        );
        setParticularValue(response.data.particular.particulars);
      } catch (error) {
        console.error(error);
      }
    };

    if (newstatement && particular == "") {
      fetchParticularsData();
    }
    if (particular != "") {
      fetchparticularvalues();
    }
  }, [newstatement, particular]);
  return (
    <div>
      <form
        className="flex max-w-full h-1/4 p-5"
        onChange={(e) => {
          e.preventDefault();
          setFormData(form.state.values);
          form.handleSubmit();
        }}
      >
        <div className="absolute w-1/3 gap-10 flex ">
          <span
            className="flex items-center font-semibold text-sm px-2 py-2 gap-2 h-10 bg-blue-600 rounded-2xl text-white justify-center cursor-pointer"
            onClick={setNewStatement}
          >
            {" "}
            <FaPlus />
            Create Statement
          </span>
          <span className={`flex gap-2 ${!newstatement ? "invisible" : ""}`}>
            <span className="flex items-center text-xs gap-5">
              Choose Template:
            </span>
            <select
              className=" px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white overflow-hidden"
              onChange={(e) => setParticular(e.target.value)}
              value={particular ?? ""}
            >
              <option value="">Select Template</option>

              {particulars.map((particular) => (
                <option value={particular.id} key={particular.id}>
                  {particular.template}
                </option>
              ))}
            </select>
          </span>
        </div>
        <div className="flex w-1/3 h-56 items-center">
          <div>
            <form.Field
              name="cargo_details"
              validators={{
                onChange: ({ value }) =>
                  value == "" ? "Enter the cargo details" : value,
              }}
            >
              {(field) => (
                <div className="flex items-end justify-between text-sm font-medium gap-2">
                  <label htmlFor={field.name}>Cargo Details:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={form.state.values.cargo_details}
                    type="text"
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border-b-2 border-gray-400  p-1 text-gray-800 outline-none transition-all duration-200"
                  />
                </div>
              )}
            </form.Field>
            <form.Field
              name="gross_weight"
              validators={{
                onSubmit: ({ value }) =>
                  value == "" ? "Enter the Gross weight" : value,
              }}
            >
              {(field) => (
                <div className="flex items-end justify-between text-sm font-medium gap-2">
                  <label htmlFor={field.name}>Gross Weight:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={form.state.values.gross_weight ?? ""}
                    type="text"
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border-b-2 border-gray-400  p-1 text-gray-800 outline-none transition-all duration-200"
                  />
                </div>
              )}
            </form.Field>
            <form.Field
              name="chargeable_weight"
              validators={{
                onSubmit: ({ value }) =>
                  value == "" ? "Enter the Chargable weight" : value,
              }}
            >
              {(field) => (
                <div className="flex items-end justify-between text-sm font-medium gap-2">
                  <label htmlFor={field.name}>Chargable Weight:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={form.state.values.chargeable_weight ?? ""}
                    type="text"
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border-b-2 border-gray-400  p-1 text-gray-800 outline-none transition-all duration-200"
                  />
                </div>
              )}
            </form.Field>

            <form.Field
              name="description"
              validators={{
                onSubmit: ({ value }) =>
                  value == "" ? "Enter the Description" : value,
              }}
            >
              {(field) => (
                <div className="flex items-end justify-between text-sm font-medium gap-2">
                  <label htmlFor={field.name}>Description:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={form.state.values.description ?? ""}
                    type="text"
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border-b-2 border-gray-400  p-1 text-gray-800 outline-none transition-all duration-200"
                  />
                </div>
              )}
            </form.Field>
          </div>
        </div>
        <div className="flex flex-col items-center w-1/3  text-xl relative">
          <div className="top-0 text-center  font-semibold mb-10">
            Logistics Comparison Statement
          </div>
          <div className="flex flex-col ">
            <form.Field
              name="supplier"
              validators={{
                onSubmit: ({ value }) =>
                  value == "" ? "Enter the Supplier Name" : value,
              }}
            >
              {(field) => (
                <div className="flex items-end justify-between text-sm font-medium gap-2">
                  <label htmlFor={field.name}>Supplier:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={form.state.values.supplier ?? ""}
                    type="text"
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border-b-2 border-gray-400  p-1 text-gray-800 outline-none transition-all duration-200"
                  />
                </div>
              )}
            </form.Field>
            <form.Field
              name="scopeofwork"
              validators={{
                onSubmit: ({ value }) =>
                  value == "" ? "Enter the Scope of Work" : value,
              }}
            >
              {(field) => (
                <div className="flex items-end justify-between text-sm font-medium gap-2">
                  <label htmlFor={field.name}>Scope of work:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={form.state.values.scopeofwork ?? ""}
                    type="text"
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border-b-2 border-gray-400  p-1 text-gray-800 outline-none transition-all duration-200"
                  />
                </div>
              )}
            </form.Field>
            <form.Field
              name="mode"
              validators={{
                onSubmit: ({ value }) =>
                  value == "" ? "Enter the mode of Work" : value,
              }}
            >
              {(field) => (
                <div className="flex items-end justify-between text-sm font-medium gap-2">
                  <label htmlFor={field.name}>Mode:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={form.state.values.mode ?? ""}
                    type="text"
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border-b-2 border-gray-400  p-1 text-gray-800 outline-none transition-all duration-200"
                  />
                </div>
              )}
            </form.Field>
          </div>
        </div>
        <div className="flex w-1/3 items-center h-56 pl-10">
          <div>
            <form.Field
              name="date"
              validators={{
                onChange: ({ value }) =>
                  value == "" ? "Enter the Date" : value,
              }}
            >
              {(field) => (
                <div className="flex items-end justify-between text-sm font-medium gap-2">
                  <label htmlFor={field.name}>Date:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={form.state.values.date ?? ""}
                    type="date"
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border-b-2 w-36 border-gray-400  p-1 text-gray-800 outline-none transition-all duration-200"
                  />
                </div>
              )}
            </form.Field>
            <form.Field
              name="po"
              validators={{
                onChange: ({ value }) =>
                  value == "" ? "Enter the Date" : value,
              }}
            >
              {(field) => (
                <div className="flex items-end justify-between text-sm font-medium gap-2">
                  <label htmlFor={field.name}>PO:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={form.state.values.po ?? ""}
                    type="text"
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border-b-2 w-36 border-gray-400  p-1 text-gray-800 outline-none transition-all duration-200"
                  />
                </div>
              )}
            </form.Field>
            <form.Field
              name="project"
              validators={{
                onChange: ({ value }) =>
                  value == "" ? "Enter the Date" : value,
              }}
            >
              {(field) => (
                <div className="flex items-end justify-between   text-sm font-medium gap-2">
                  <label htmlFor={field.name}>Project:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={form.state.values.project ?? ""}
                    type="text"
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border-b-2 w-36 border-gray-400  p-1 text-gray-800 outline-none transition-all duration-200"
                  />
                </div>
              )}
            </form.Field>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StatementHeader;

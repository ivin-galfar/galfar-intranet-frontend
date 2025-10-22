import LogisticsTable from "../Components/LogisticsTable";
import StatementHeader from "../Components/StatementHeader";
import { useStatement } from "../store/logisticsStore";

const LogisticsStatement = () => {
  const { tableData } = useStatement();
  console.log(tableData);

  return (
    <div className="flex-grow px-5">
      <StatementHeader />
      <LogisticsTable />
    </div>
  );
};

export default LogisticsStatement;

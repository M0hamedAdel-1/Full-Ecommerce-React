import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./saleschart.css"



const SalesCharts = ({salesOverview} ) => {

const data = salesOverview?.map((item) => ({
  name: item.createdAt,
  value: item.totalAmount,
})) || [];
  return (
    <div className="chart-box">
      <h1>Sales Overview</h1>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesCharts;
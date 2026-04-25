import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./productschart .css"

const ProductsChart = ({topProducts}) => {
  const data = topProducts?.map((item) => ({
  name: item.name,
  value:  item.quantity,
})) || [];
  return (
    <div className="chart-box">
      <h1>Top Products</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductsChart;
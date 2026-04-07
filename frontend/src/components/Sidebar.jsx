import { Link } from "react-router-dom";



const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-5">
      <h1 className="text-2xl font-bold">Finance AI</h1>

        <ul className="space-y-6">
            <li>
                <Link to="/">Dashboard</Link>
            </li>
            <li>
                <Link to="/transactions">Transactions</Link>
            </li>
        </ul>
    </div>

    
  );
};

export default Sidebar;
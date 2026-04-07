import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-2xl font-bold text-blue-600">Welth.</h1>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="px-4 py-2 border rounded-lg text-sm font-medium"
        >
          Dashboard
        </Link>

        <Link
          to="/transactions"
          className="px-4 py-2 bg-black text-white rounded-lg text-sm"
        >
          Add Transaction
        </Link>

       <div
        onClick={() => navigate("/profile")}
        className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer hover:scale-105 transition"
        ></div>
      </div>
    </div>
  );
};

export default Navbar;
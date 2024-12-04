import { Link } from "react-router-dom";
import { CgGym } from "react-icons/cg";
import { IoHome } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="flex w-full justify-between items-center min-h-[5vh] px-12 py-4 bg-[#010409] text-[#dedfdf]">
      <Link
        to="/"
        className="flex items-center gap-3 text-4xl hover:text-pink-600"
      >
        <CgGym className="text-5xl" />

        <div className="flex flex-col text-2xl font-light font-mono">
          <h1>WORKOUT</h1>
          <h1 className="font-light font-mono">BUDDY</h1>
        </div>
      </Link>

      <div className="flex gap-8 text-lg">
        <Link
          to="/"
          className="flex justify-center items-center gap-2 hover:text-blue-200 font-bold"
        >
          HOME
          <IoHome />
        </Link>
      </div>
    </div>
  )
}

export default Navbar;
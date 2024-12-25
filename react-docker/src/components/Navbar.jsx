import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export function Navbar() {

    const navigate = useNavigate()

    function handleClick() {
        navigate('/home')
    }

    return (
       <>
            <div className="flex items-center justify-between p-2 pl-4 border border-b px-10">
                <div className="flex gap-5 items-center">
                    <h1 className="text-2xl font-semibold">ResumeSwift</h1>
                    <Link to={'/'}>About</Link>
                    <Link to={'/'}>Home</Link>

                </div>
                <div className="flex">
                    <button onClick={handleClick}className='bg-[#2356F6] rounded-full text-white px-7 py-2 text-center'>Create</button>
                </div>
            </div>

       </>
    )
}
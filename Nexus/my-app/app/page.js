import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center text-white h-1/2 items-center pt-10">
        <div className="flex justify-center items-center">
          <span><img className="rounded-full mr-5" src="/favicon.png" alt="" width={100} /></span>
          <span className="font-bold text-5xl text-center">Nexus Club</span>
        </div>
        <div className=" mt-10 text-center flex flex-col items-center">
          <p className="text-4xl font-bold w-[500px]">"Unlocking Tomorrow's Technology Today!"</p>
          <p className="text-xl mt-5 w-[700px]">Charting the Course of Innovation: Spearheading Revolutionary Advancements and Transformations in the Dynamic Landscape of Technology and Engineering</p>
          <div className="flex">
            <Link href='/login'><button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-5 hover:font-bold duration-200 w-32">Start Now</button></Link>
            <Link href='/about'><button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-5 hover:font-bold duration-200 w-32">Read More</button></Link>
          </div>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10 mt-10"></div>
      <div className="text-white flex flex-col items-center">
        <div className="container mx-auto">
          <h1 className="text-center mt-10 text-3xl font-bold">Why Join Nexus?</h1>
          <div className="flex gap-5 ml-5 mr-5 justify-between">
            <div className="item flex flex-col justify-center items-center mt-10 w-full">
              <img className="bg-blue-600 rounded-full" src="/spread.gif" alt="" width={150} />
              <p className="font-bold mt-5">Gain Knowledge and experience</p>
              <p className="text-center"> You can gain vast amounts of knowledge and experience from your peers and mentors</p>
            </div>
            <div className="item flex flex-col justify-center items-center mt-10 w-full">
              <img className="bg-blue-600 rounded-full" src="/solution.gif" alt="" style={{ width: '150px', height: '150px' }} />
              <p className="font-bold mt-5">Get solutions ASAP</p>
              <p className="text-center">Got a problem? No problem! At Nexus, you can get solutions to your problems in no time with help from your peers and mentors</p>
            </div>
            <div className="item flex flex-col justify-center items-center mt-10 w-full">
              <img className="bg-blue-600 rounded-full" src="/problem.gif" alt="" width={150} />
              <p className="font-bold mt-5">Grow you Network</p>
              <p className="text-center">At Nexus we promote connecting and interacting with people to grow. The more people you connect with the more advantageous it is for you</p>
            </div>
          </div>
        </div>
        <div className="bg-white h-1 opacity-10 mt-10 w-full"></div>
        

      </div>

    </>
  );
}

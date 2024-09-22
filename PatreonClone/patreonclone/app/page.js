import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center text-white h-1/2 items-center pt-10">
        <div className="font-bold text-5xl flex items-center justify-center">
          Be a Creator <span><img src="/moni1.gif" alt="" width={50} /></span>
        </div>
        <div className=" mt-10 text-center">
          <p>A crowd funding platform for creators. Get funded by your fans and followers</p>
          <Link href = '/login'><button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-5">Start Now</button></Link>
          <Link href = '/about'><button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-5">Read More</button></Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10 mt-10"></div>
      <div className="text-white flex flex-col items-center">
        <div className="container mx-auto">
          <h1 className="text-center mt-10 text-3xl font-bold">Why create content?</h1>
          <div className="flex gap-5 ml-5 mr-5 justify-between">
            <div className="item flex flex-col justify-center items-center mt-10 w-full">
              <img className="bg-blue-600 rounded-full" src="/working.gif" alt="" width={150} />
              <p className="font-bold mt-5">Create Anything</p>
              <p>Go crazy with you ideas and publish</p>
            </div>
            <div className="item flex flex-col justify-center items-center mt-10 w-full">
              <img className="bg-blue-600 rounded-full" src="/moni.gif" alt="" style={{width:'150px' , height:'150px'}} />
              <p className="font-bold mt-5">Fund yourself</p>
              <p>Content creators get paid</p>
            </div>
            <div className="item flex flex-col justify-center items-center mt-10 w-full">
              <img className="bg-blue-600 rounded-full" src="/fans.gif" alt="" width={150} />
              <p className="font-bold mt-5">Fans want to help</p>
              <p>Your fans are always available to help</p>
            </div>
          </div>
        </div>
        <div className="bg-white h-1 opacity-10 mt-10 w-full"></div>
        <div className="text-white flex flex-col items-center">
        <div className="container mx-auto">
          <h1 className="text-center mt-10 text-3xl font-bold">Learn More</h1>
        </div>
        </div>
        <iframe className="mt-10 mb-10" width="560" height="315" src="https://www.youtube.com/embed/os83isUknJA?si=GAZd35PKDTuRlPqM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
      
    </>
  );
}

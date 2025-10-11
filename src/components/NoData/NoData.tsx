import React from "react";
import { noDataImg } from "../../assets/Images";
// import { studentImg } from "../../../../assets/Images"; // Replace with your desired image

interface NoDataPageProps {
  title?: string;
  message?: string;
  imgSrc?: string;
}

const NoDataPage: React.FC<NoDataPageProps> = ({
  title = "No Data",
  message = "There is no data to show you right now",
  imgSrc = noDataImg,
}) => {
  return (
    <div className="flex flex-col items-center justify-center   gap-4   w-100  bg-body-secondary">
      <img src={imgSrc} alt="No Data" className="w-80 h-64 " />
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-500 text-center">{message}</p>
    </div>
  );
};

export default NoDataPage;

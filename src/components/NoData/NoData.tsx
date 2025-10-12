import noData from "../../assets/Images/nodata.jpg";

interface NodataProps {
  message: string;
}

const Nodata = ({ message }: NodataProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-gray-500">
      <img src={noData} className="w-[20rem]" alt="no data image" />
      <p>{message}</p>
    </div>
  );
};

export default Nodata;
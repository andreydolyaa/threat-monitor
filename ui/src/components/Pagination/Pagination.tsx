import CustomButton from "../CustomButton/CustomButton";
import "./Pagination.css";

type Pagination = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: Pagination) => {
  const nextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };
  const previousPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  return (
    <div className="pagination">
      <CustomButton text="Previous" handleOnClick={previousPage} />
      <div className="page-of">{`${currentPage} / ${totalPages}`}</div>
      <CustomButton text="Next" handleOnClick={nextPage} />
    </div>
  );
};

export default Pagination;

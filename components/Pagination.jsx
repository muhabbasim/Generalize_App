
export default function Pagination( { page, setPage, totalPosts }) {

  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrevious = () => {
    setPage(page - 1);
  };


  return (
    <div className='w-full flex flex-between mb-10'>
      <button 
        className='gray_btn' 
        onClick={handlePrevious}
        disabled={page === 1}
      >
        Previous
      </button>

      <button 
        className='gray_btn' 
        onClick={handleNext} 
        disabled={page * 5 >= totalPosts}
      >
        Next
      </button>
    </div>
  )
}

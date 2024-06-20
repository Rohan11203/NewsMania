import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 8; 

  useEffect(() => {
    const fetchNews = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${import.meta.env.VITE_API_KEY}`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        setArticles(data.articles);
        setTotalResults(data.totalResults);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [category, page]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalResults / pageSize);

  // Function to go to the next page
  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // Function to go to the previous page
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
      <div className="news-container d-flex flex-wrap justify-content-center">
        {articles.map((news, index) => (
          <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url} />
        ))}
      </div>

      <div className="text-center my-3">
        <button className="btn btn-secondary mx-1" onClick={prevPage} disabled={page === 1}>Previous</button>

     
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`btn mx-1 ${page === index + 1 ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setPage(index + 1)}
          >
            {index + 1} 
          </button>
        ))}

        <button className="btn btn-secondary mx-1" onClick={nextPage} disabled={page >= totalPages}>Next</button>
      </div>
    </div>
  );
};

export default NewsBoard;

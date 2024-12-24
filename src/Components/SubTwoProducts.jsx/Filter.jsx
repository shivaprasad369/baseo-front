import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { useQuery } from 'react-query';
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonCard from "../UI/SkeltonCard";


const MultipleFilter = () => {
  const [selectedValues, setSelectedValues] = useState([]); // Tracks selected filter options
  const [priceRange, setPriceRange] = useState([0, 1000]); // Price range for filtering
  const [maxPrice, setMaxPrice] = useState(1000); // Maximum price for slider range
  const [filteredProducts, setFilteredProducts] = useState([]); // Paginated filtered product list
  const [hasMore, setHasMore] = useState(true); // Whether there are more products to load
  const [page, setPage] = useState(1); // Current page for pagination
  const location = useLocation();
  const navigate = useNavigate();
  const [length,setLength]=useState(0)
  const [sortOption, setSortOption] = useState("1");
const {id,name,subname,subid,two,twoname}=useParams()
  // Fetch data using React Query
  const { isLoading, error, data } = useQuery({
    queryKey: ["product-sub"],
    queryFn: async () => {
      try {
        const res = await axios.get(`https://baseo.onrender.com/product-attributes/${id}/${subid}/${two}`);
        return res.data || [];
      } catch (error) {
        console.error("Error fetching products:", error);
        return [];
      }
    },
  });

  // Clear fragments from the URL
  const clearFragments = () => {
    const url = location.href || window.location.href;
    if (url.includes("#page")) {
      const newUrl = url.split("#")[0];
      navigate(newUrl, { replace: true });
    }
    window.location.reload();
  };

  // Update max price dynamically based on data
  useEffect(() => {
    if (data && data.length > 0) {
      const prices = data.map((item) => parseFloat(item.SellingPrice));
      const maxPriceFromData = Math.max(...prices);
      setMaxPrice(maxPriceFromData);
      setPriceRange([0, maxPriceFromData]);
    }
  }, [data]);

  // Group attributes by name with unique values
  const groupedAttributes = (data || []).reduce((acc, item) => {
    if (!acc[item.AttributeName]) {
      acc[item.AttributeName] = new Set();
    }
    acc[item.AttributeName].add(item.AttributeValue);
    return acc;
  }, {});

  const attributeGroups = Object.fromEntries(
    Object.entries(groupedAttributes).map(([key, value]) => [key, Array.from(value)])
  );

  // Handle filter change for Attribute Values
  const handleFilterChange = (attributeValue) => {
    setSelectedValues((prev) =>
      prev.includes(attributeValue)
        ? prev.filter((v) => v !== attributeValue) // Remove if already selected
        : [...prev, attributeValue] // Add if not selected
    );
  };

  // Handle price range change
  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  // Filter products based on selected AttributeValues and price range
  const filterProducts = (products) => {
    return products.filter((product) => {
      const matchesAttributeValue =
        selectedValues.length > 0
          ? selectedValues.includes(product.AttributeValue)
          : true;
      const matchesPrice =
        parseFloat(product.SellingPrice) >= priceRange[0] &&
        parseFloat(product.SellingPrice) <= priceRange[1];
      return matchesAttributeValue && matchesPrice;
    }).sort((a, b) => {
        if (sortOption === "2") {
          return parseFloat(a.SellingPrice) - parseFloat(b.SellingPrice);
        } else if (sortOption === "1") {
          return parseFloat(b.SellingPrice) - parseFloat(a.SellingPrice);
        } else if (sortOption === "3") {
          return a.ProductName.localeCompare(b.ProductName);
        } else if (sortOption === "4") {
          return b.ProductName.localeCompare(a.ProductName);
        }
        return 0;   
      });;
  };

  // Load more products based on pagination
  const loadMoreProducts = () => {
    const filtered = filterProducts(data); // Apply filters to all products
    const nextPage = page + 1;
    const startIndex = nextPage * 5 - 5; // Load 2 products at a time
    const newProducts = filtered.slice(startIndex, startIndex + 5); // Slice next 2 products

    if (newProducts.length > 0) {
      setFilteredProducts((prev) => [...prev, ...newProducts]); // Append new products
      setPage(nextPage);
    } else {
      setHasMore(false); // No more products to load
    }
  };

  // Update filtered products whenever filters or data changes
  useEffect(() => {
    if (data) {
      const filtered = filterProducts(data); // Apply filters
      setLength(filtered.length)
      setFilteredProducts(filtered.slice(0, 5)); // Load the first 2 products for pagination
      setHasMore(filtered.length > 5); // Check if there are more products to load
      setPage(1); // Reset page to 1 when filters or data change
    }
  }, [data, selectedValues, priceRange,sortOption]);
  if (isLoading) {
    return <SkeletonCard/>;
  }

  if (error) {
    return <div>Error fetching products. Please try again later.</div>;
  }

  return (
    <section className="w-[100%] flex items-center justify-center overflow-hidden">
      <div className="w-[100%] flex gap-10 px-[6%] py-[3rem] flex-col">
        <p className="text-md text-gray-500"><a href="/" className="hover:text-green-500 duration-300"> Home </a>{'>'} {name} {'>'} {subname}{'>'} {twoname} </p>
        <div className="w-[100%] flex gap-10">
          {/* Filters Panel */}
          <div className="w-[25%] border-[1px] h-fit p-[1rem] px-[1.5rem] rounded-xl flex flex-col gap-5">
            <div className="flex w-[100%] items-center border-b-[1px] border-gray-300 pb-[1rem] justify-between">
              <h2 className="text-xl font-bold">Filter</h2>
              <h1
                onClick={clearFragments}
                className="text-lg cursor-pointer font-bold text-[#a1d32c] uppercase tracking-wider"
              >
                Clear
              </h1>
            </div>

            {/* Price Range Slider */}
            <div className="mb-5 border-b-[1px] border-gray-300 pb-[1rem]">
              <h4>Filter by Price Range</h4>
              <Slider
                value={priceRange}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                min={0}
                max={maxPrice}
                style={{ color: "#3f51b5" }}
              />
              <div>
                <h1 className="text-sm">
                  Selected Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </h1>
              </div>
            </div>

            {/* Render Filter Options by Attribute Name */}
            <div className="flex flex-col gap-5" style={{ marginBottom: "20px" }}>
              
              {Object.entries(attributeGroups).map(([attributeName, values]) => (
                <div key={attributeName} style={{ marginBottom: "10px" }} className="border-b-[1px]  flex flex-col gap-5  border-gray-300 pb-[1rem]">
                  <h5 className="text-lg font-bold">{attributeName}</h5>
                 <div className="max-h-[20rem] flex flex-col gap-4 overflow-y-scroll">

                  {values.map((value) => (
                    <label key={value} htmlFor={`filter-${value}`} style={{ marginRight: "10px" }} >
                      <input
                        id={`filter-${value}`}
                        type="checkbox"
                        value={value}
                        onChange={() => handleFilterChange(value)}
                        checked={selectedValues.includes(value)}
                        style={{ marginRight: "5px" }}
                      />
                      {value}
                    </label>
                  ))}
                 </div>
                </div>
              ))}
            </div>
          </div>

          {/* Products List */}
          <div className="w-[70%] flex flex-col gap-5">
              {/* <Categorie/> */}
            <div className="w-[100%] flex  items-center justify-between">
            <h4>Showing <span className="font-bold capitalize">{length} results</span></h4>
              <div className="flex gap-4 items-center">
                <h1 className="text-lg tracking-wider">
                    Sorted By
                </h1>
                <select name="sort" className="border-[1px] px-4 py-2 outline-none" id="" value={sortOption}
                onChange={(e)=>setSortOption(e.target.value)}>
                    <option value="1">Price: High - Low</option>
                    <option value="2">Price: Low - High</option>
                    <option value="3">Title: A - Z</option>
                    <option value="4">Title: Z - A</option>

                </select>
              </div>
            </div>
            <InfiniteScroll
              dataLength={filteredProducts.length} // Length of the current list
              next={loadMoreProducts} // Function to load more products
              hasMore={hasMore} // Whether there are more products to load
              loader={<h4>Loading more products...</h4>} // Loader while fetching
              endMessage={<p>No more products to show!</p>} // Message when no more products
            >
              {filteredProducts.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0 }} className="w-[100%] grid grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <a  key={`${product.ProductAttributeID}-${index}`} href={`/products/details/${product.ProductID}/${product.ProductName}/${product.ProductAttributeID}`} className="">

                    <li
                     
                      className="border-[1px] border-gray-300 rounded-lg flex flex-col item-center 
                      justify-center hover:shadow-2xl duration-500"
                      style={{
                        padding: "10px",
                        margin: "5px 0",
                        
                        borderRadius: "5px",
                      }}
                    >
                        <div className="w-[100%] h-[15rem] flex items-center justify-center">
                            <img src={'https://baseo.onrender.com/'+product.Image} alt="" />
                            </div>                        
                        <div className="w-[100%] pb-[1rem] flex flex-col gap-2 items-center justify-center ">

                      <h1 className="text-center text-md tracking-wider">{product.ProductName}</h1>
                    
                    
                      <span className="text-xl font-bold text-[#62bb19]"> ₹{parseFloat(product.SellingPrice).toFixed(2)}</span>
                        </div>
                    </li>
                    </a>
                  ))}
                </ul>
              ) : (
                <p>No products match the selected filters.</p>
              )}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultipleFilter;

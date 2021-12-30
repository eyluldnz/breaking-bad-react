import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';

export default function Character() {
    const location = useLocation();  //bulunduğumuz yeri tutuyor
    const navigate = useNavigate() //nereye yönlendireceğimizi belirtir.
    const urlParam = new URLSearchParams(location.search);
    const [q, setQ] = useState(urlParam.get('name'));
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([]);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [dataBySeason, setDataBySeason] = useState("");
    let limit = 8;
    const [pageCount, setpageCount] = useState(0);
    const URL = 'https://www.breakingbadapi.com/api/characters';

    useEffect(() => {
        setTimeout(() => {
            fetch(URL).then(res => res.json()).then(json => {
                let filteredData = json.filter(char => char.appearance.includes(Number(dataBySeason)));
                setData(filteredData);
                console.log(filteredData)
            });
            setLoading(false);
            setpageCount(Math.ceil(63 / limit));

        }, 250)

    }, [dataBySeason])

    useEffect(() => {
        setTimeout(() => {
            fetch(`${URL}?limit=${limit}&offset=1`).then(res => res.json()).then(json => {
                setData(json);
                console.log(json)
            });
            setLoading(false);
            setpageCount(Math.ceil(63 / limit));

        }, 1000)

    }, [limit])

    useEffect(() => {
        setTimeout(() => {
            fetch(`${URL}?limit=${limit}&offset=${currentPage}`).then(res => res.json()).then(json => {
                setData(json);
                console.log(json)
            });
            setLoading(false);
            setpageCount(Math.ceil(63 / limit));

        }, 1000)

    }, [currentPage])

    useEffect(() => {
        if (q !== null) {
            setTimeout(() => {
                fetch(`${URL}?name=${q}`).then(res => res.json()).then(json => {
                    setData(json)
                    console.log(json)
                });
                setLoading(false);

            }, 500)
        }


    }, [q])

    function formHandler(e) {
        e.preventDefault();
        navigate(`/characters?name=${e.target.name.value}`);
        setQ(e.target.name.value);
    }
    const handlePageClick = async (data) => {
        console.log(data.selected);
        let newCount = (data.selected * 8);
        setCurrentPage(newCount);

    };
    const handlerSelect = (e) => {
        setDataBySeason(e.target.value);
    }

    return (
        <>
            <form onSubmit={formHandler}>
                <div className="mb-3">
                    <label htmlFor="search" className="form-label">
                        Search Post
                    </label>
                    <input type="search" className="form-control" name="name" id="search" defaultValue={q} />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>

            {
                loading ? <h1>Yükleniyor</h1> : null
            }

            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div class="row justify-content-end my-5">
                            <div class="col-4">
                                <select className="form-select" name="season" onChange={handlerSelect}>
                                    <option selected>Chosee Season</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <table className="table table-dark ">
                        
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Name</th>
                                <th scope="col">NickName</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                        {
                        data.map(item =>
                            <tr onClick={()=>navigate("/characters/" + item.char_id)}>
                                <th scope="col">
                                <img src={item.img} height={75} width={75} />
                                </th>
                                <th scope="col">
                                {item.name}
                                </th>
                                <th scope="col">
                                {item.nickname}
                                </th>
                                
                            </tr>

                        )

                    }
                        </tbody>
                    </table>


                </div>
                <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
            </div>
        </>
    )
}

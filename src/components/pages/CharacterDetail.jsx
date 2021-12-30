import React from 'react'
import { useLocation, useNavigate, Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function CharacterDetail() {
    const params = useParams();
    const [q, setQ] = useState(params.id);
    const [data, setData] = useState([]);
    const [occupation, setOccupation] = useState([]);
    const [loading, setLoading] = useState([]);
    const URL = 'https://www.breakingbadapi.com/api/characters';
    let arrayData=[];

    useEffect(() => {
        setTimeout(() => {
            fetch(URL + "/" + q).then(res => res.json()).then(json => {
                setData(json[0])
                setOccupation(json[0].occupation);
                console.log(json)
            });
            setLoading(false);

        }, 10)

    }, [])

    return (
        <>

            <hr />

            {
                loading ? <h1>Yükleniyor</h1> : null
            }

            <div className="container my-5">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">

                            <div className="card-body">
                                <img src={data.img} height={500} />
                                <h5 className="card-title">{data.name}</h5>
                                <p className="card-text">{data.nickname}</p>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" >Birtdate</span>
                                    <input type="text" disabled className="form-control" defaultValue={data.birthday} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />

                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" >Portrayed</span>
                                    <input type="text" disabled className="form-control" defaultValue={data.portrayed} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />

                                </div>
                               
                                <div className="input-group mb-3">
                                    <table className="table table-light ">

                                        <thead>
                                            <tr>
                                                <th scope="col">Occupation</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                           
                                            occupation.length>0?
                                            occupation.map(item =>
                                                <tr>

                                                    <th scope="col">
                                                        {item}
                                                    </th>


                                                </tr>

                                            )
:"Not Found" 
                                          
                                            }
                                        </tbody>
                                    </table>
                                </div>


                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

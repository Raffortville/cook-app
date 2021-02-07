import React from 'react'


const Pagination = (props) => {

    const nbPagesArr = [];

    for(let n = 1; n <= props.nbPages; n++){

        nbPagesArr.push(n)
    }


    return(
        <div className="pagin">
            {nbPagesArr.map(num=>

                <ul key={num} >
                    <li className={num === props.currentPage ? "active" : null} onClick={()=>props.handleCurrentPage(num)}>{num}</li>
                </ul>
            )}
        </div>
    )
}


export default Pagination
import React from "react";
import Icon from "../../components/Icon"

function make(rank){
   const data = []
   console.log(rank)
    for(let i = 0; i < 8; i++){
       if(i < rank && (i + .5) === rank) data.push("fas fa-star-half-alt")
       else if( i < rank ) data.push("fas fa-star")
    }
    return data
} 

const Stars = ({rank}) =>  
    <div >
        {make(rank).map((data, i)=>(<Icon id={data} key={data+i}/>))}                    
    </div>;

export default Stars;
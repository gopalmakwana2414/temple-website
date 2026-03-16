import { Link } from "react-router-dom";

export default function Festivals() {

const festivals = [

{
name:"Nag Panchami",
image:"/images/nagpanchami/nagpanchami1.jpg",
link:"/Festivals/nag-panchami"
},

{
name:"Teja Dashmi (Mela)",
image:"/images/tejadashami/mela1.jpg",
link:"/Festivals/teja-dashmi"
},

{
name:"Kartik Purnima (56 Bhog)",
image:"/images/chhapan bhog matakheda/chppan_bhog3.jpg",
link:"/Festivals/kartik-purnima"
}

];

return(

<div className="min-h-screen bg-orange-50 py-16">

<h1 className="text-5xl text-center font-bold mb-12">
Temple Festivals
</h1>

<div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">

{festivals.map((festival,index)=>(

<Link to={festival.link} key={index}>

<div className="festival-card">

<img
src={festival.image}
className="festival-img"
/>

<h2 className="festival-name">
{festival.name}
</h2>

</div>

</Link>

))}

</div>

<style>{`

.festival-card{

background:white;

border-radius:15px;

overflow:hidden;

box-shadow:0 10px 25px rgba(0,0,0,0.15);

transition:.4s;

cursor:pointer;

}

.festival-card:hover{

transform:translateY(-10px) scale(1.03);

}

.festival-img{

width:100%;
height:310px;
object-fit:cover;

}

.festival-name{

font-size:24px;

font-weight:600;

padding:20px;

text-align:center;

}

`}</style>

</div>

)

}
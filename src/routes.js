import Character from "./components/pages/Character"
import CharacterDetail from "./components/pages/CharacterDetail";
import Home from "./components/pages/Home"

const routes=[
{path:'/',title:'Home',element:Home, isNav:true},
{path:"characters",title:'Characters',element:Character,isNav:true},
{path:"/characters/:id",title:"Post",element:CharacterDetail,isNav:false},

]

export default routes;
import Parcela from "../components/card-parcela"
import Navbar from "../components/navbar"

const Home = () => {

  const datosSensor = [
    {humedadSuelo: "30%", luminosidad: "45000 lx", temperatura: "30° centigrados", humedadAire: "40%"},
    {humedadSuelo: "35%", luminosidad: "45000 lx", temperatura: "30° centigrados", humedadAire: "40%"},
    {humedadSuelo: "35%", luminosidad: "45000 lx", temperatura: "29° centigrados", humedadAire: "40%"},
    {humedadSuelo: "32%", luminosidad: "45000 lx", temperatura: "30° centigrados", humedadAire: "40%"},
  
  ]

  return (
    <div>
      <div className="w-full flex grid-cols-4 gap-10 justify-center p-10">
      {
        datosSensor.map((sensor, i) => (
          
          <Parcela
          key={i}
          numeroSeccion={i+1}
          humedadSuelo={sensor.humedadSuelo}
          luminosidad={sensor.luminosidad}
          temperatura={sensor.temperatura}
          humedadAire={sensor.humedadAire}
          />
        ))
      }
      </div>
    </div>
  )
}

export default Home

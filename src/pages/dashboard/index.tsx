import { Container } from "../../components/container";

import { DashboardHeader } from "../../components/painelheader";

import { FiTrash2 } from "react-icons/fi";

import { useEffect, useState, useContext } from "react";

import { db, storage } from "../../services/firebaseConection";

import { ref,deleteObject } from "firebase/storage";

import { collection,
  getDocs,
  where,
  query,
  doc,
  deleteDoc 
} from "firebase/firestore";

import { AuthContext } from "../../context/authcontext";


interface CarProps{
  id:string
  name:string
  year:string
  price:string|number
  city:string
  km:string
  images: ImageCarProps[]
  uid:string
}

interface ImageCarProps{
  name: string
  uid: string
  url: string
}

export function Dashboard () {
   const [ cars, setCars] = useState<CarProps[]>([])
   const { user } = useContext(AuthContext)
   useEffect(() => {

    function loadCars(){
      if(!user?.uid){
        return;
      }

      const carsRef = collection(db, "cars")
      const queryRef = query(carsRef, where("uid", "==", user.uid))

      getDocs(queryRef)
      .then((snapshot) => {
        const listcars = [] as CarProps[];

        snapshot.forEach( doc => {
          listcars.push({
            id: doc.id,
            name: doc.data().name,
            year: doc.data().year,
            km: doc.data().km,
            city: doc.data().city,
            price: doc.data().price,
            images: doc.data().images,
            uid: doc.data().uid
          })
        })

        setCars(listcars);  
        
      })

    }

    loadCars();

  }, [user])



  async function handleDeleteCar(car: CarProps){
  const  itemCar =  car

    const docRef = doc(db, "cars",  itemCar.id)
    await deleteDoc(docRef);

    itemCar.images.map( async (image) => {
        const imagePath = `images/${image.uid}/${image.name}`
        const imageRef = ref(storage, imagePath)

        try{
          await deleteObject(imageRef)
          setCars(cars.filter(car => car.id !==  itemCar.id))

          }catch(err){
            console.log('error ao excluir essa imagem');
          }
    })
    
  }


  return (
    <Container>
      <DashboardHeader/>

      <main className="grid gird-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

      {cars.map( car => (
        <section key={car.id} className="w-full bg-white rounded-lg relative">
          <button 
          title="delete"
          onClick={ () => handleDeleteCar(car) }
          className="absolute bg-white w-14 h-14 rounded-full flex items-center justify-center right-2 top-2 drop-shadow"
          >
            <FiTrash2 size={26} color="#000" />
          </button>

          <img
          title="image car"
            className="w-full rounded-lg mb-2 max-h-70"
            src={car.images[0].url}
          />
          <p className="font-bold mt-1 px-2 mb-2">{car.name}</p>

          <div className="flex flex-col px-2">
            <span className="text-zinc-700">
              Ano {car.year} | {car.km} km
            </span>
            <strong className="text-black font-bold mt-4">
              R$ {car.price}
            </strong>
          </div>

          <div className="w-full h-px bg-slate-200 my-2"></div>
          <div className="px-2 pb-2">
            <span className="text-black">
              {car.city}
            </span>
          </div>

        </section>
      )) }

      </main>

    </Container>
  )
}

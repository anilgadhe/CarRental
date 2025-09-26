import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const AppContext = createContext();


export const AppProvider = ({ children }) => {

    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [pickupDate, setPickupDate] = useState('')
    const [returnDate, setReturnDate] = useState('')
    const [Cars, setCars] = useState([]);

    //Function to check if usre is logged in

    const fetchUser = async () => {

        await axios.get('/user/v1/data').then((res) => {
            setUser(res.data.user)
            setIsOwner(res.data.user.role === 'owner')
        }).catch((error) => {
            navigate('/');
            toast.error(error.response?.data?.message || error.message);
        })

    }

    // Function to fetch all cars from the server

    const fetchCars = async()=>{

        await axios.get('/user/v1/cars').then((respone)=>{
            setCars(respone.data.cars);
        }).catch((error)=>{
            return toast.error(error.message);
        })
    }


  //Function to log out the user
  const logout= ()=>{
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsOwner(false);
    axios.defaults.headers.common['Authorization']='';
    toast.success('You have logged out');
  }

    //useEffect to retrive the token from localstorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token)
        fetchCars()
    }, [])


 // useEffect to fetch the data when token is available
    useEffect(() => {
 
        if(token){
            axios.defaults.headers.common['Authorization']=`${token}`

            fetchUser()
        }

    }, [token]);


    const value = {
        navigate, currency, axios,user,setUser,token,setToken,isOwner,setIsOwner,fetchUser,
        showLogin,setShowLogin,logout,fetchCars,Cars,setCars,setReturnDate,pickupDate,returnDate,setPickupDate
    }

    return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
    )

}


export const useAppContext = () => {
    return useContext(AppContext);
}
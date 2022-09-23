import { useRef, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { stateContext } from '../App';
import { signUp, UseAuth } from '../components/Firebase'
import Slider from 'react-slick'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Loading from '../components/Loading/Loading'
import first from "../Images/first.png"
import second from "../Images/second.png"
import third from "../Images/third.png"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

function SignUp() {

//storing the initialized  hook to a variable

    const navigate = useNavigate();

 //retreiving the global variables from the context hook

    const { loading, setLoading } = useContext(stateContext)

//initializing the refs
   const emailRef = useRef()

    const passwordRef = useRef();
    const currentUser = UseAuth()

//declaring the signup functionality

    const handleSignUp = async () => {
        setLoading(true)
        try {
            await signUp(emailRef.current.value, passwordRef.current.value)
            navigate('/login')
        }
        catch (err) {
            if (err.code === "auth/weak-password") {
                toast.info('Weak password!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            } else if (err.code === "auth/email-already-in-use") {
                toast.info('Email already in use, kindly log in', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.info('Network error, kindly check your internet connection', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            setLoading(false)
        }
        setLoading(false)
    }

    //react slick settings 

    const settings = {
        slidesToShow: 1,
        speed: 500,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        infinite: true,
        pauseOnHover: true
    }

    return (
        <section>
            {loading ? <Loading /> :
                <main className='login-wrapper grid grid-cols-2'>
                    <section>
                        <Slider {...settings} className="bg-purple h-screen flex justify-center pt-24 pl-32 ">

                            <figure className='flex justify-center align-middle'>
                                <img src={first} alt="notes" className='w-96' />
                                <figcaption className='text-2xl font-semibold text-primary text-center w-80 ml-4 mt-28'>New Scheduling Options And Management Options</figcaption>
                                <p className='text-xs font-thin text-primary text-center w-64 leading-2 mt-4 tracking-wider ml-10'>Dockett offers a seamless service that allows users to easily take notes and stay organized at all times.</p></figure>

                            <figure >
                                <img src={second} alt="notes" className='w-96' />
                                <figcaption className='text-2xl font-semibold text-primary  text-center w-72 ml-14 mt-28'>Change The Quality Of Your Life.</figcaption>
                                <p className='text-xs font-thin text-primary text-center w-64 leading-2 mt-4 tracking-wider ml-16'>Dockett offers a seamless service that allows users to easily take notes and stay organized at all times. </p>
                            </figure>

                            <figure>
                                <img src={third} alt="notes" className='w-96' />
                                <figcaption className='text-2xl font-semibold text-primary  text-center w-72 ml-6 mt-24'>Your Safety And Security Is Priortized.</figcaption>
                                <p className='text-xs mt-4 font-thin text-primary text-center w-64 leading-2 tracking-wider ml-10'>Dockett offers a seamless service that allows users to easily take notes and stay organized at all times.</p>
                            </figure>
                        </Slider>
                    </section>

                    <section className="Login text-center flex flex-col	items-center pt-32 bg-primary tracking-wider rounded-3xl" >
                        <h1 className='text-3xl mb-6 font-bold'>Sign up!</h1>
                        <p className='mb-6 text-xs tracking-wide text'>Take notes the simple way for free, forever</p>
                        <section className='login-input flex flex-col font-medium'>
                            <input
                                className='w-96	border-solid border border-gray-200 p-2 h-12 mb-6 rounded-2xl text-sm '
                                type='text'
                                placeholder='email'
                                required
                                ref={emailRef}
                            ></input>

                            <input
                                className='w-96	border-solid border border-gray-200 p-2 h-12 rounded-2xl text-sm '
                                placeholder='password must be 6 characters'
                                type='password'
                                required
                                ref={passwordRef}
                            ></input>
                            <button onClick={handleSignUp} className=' bg-purple text-white w-96 mt-8 rounded-md items-center h-12'>Sign up</button>
                            <section className="flex justify-center pt-36 align-middle">
                                <p className="flex align-middle text-xs tracking-wide text mt-20">Already have an account? <Link className='text-purple ml-2' to='/login'> login! </Link></p>
                            </section>
                        </section>
                    </section>
                    <p className='text-primary text-sm font-thin mt-2'>alert(`Currently logging in as ${currentUser?.email} `)</p>
                    <ToastContainer
                        position="bottom-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </main >
            }

        </section>
    )
}

export default SignUp
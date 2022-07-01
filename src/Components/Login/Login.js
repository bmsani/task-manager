import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Loading/Loading';

const Login = () => {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from.pathname || '/'

    let singInError;
    if(error || gError){
        console.log(error?.message || gError?.message);
        singInError = <p className='text-red-500'> <small>{error?.message || gError?.message}</small></p>
    }
    useEffect(() => {
        if(user || gUser){
            navigate(from, {replace: true});
        }
    },[user,gUser,from, navigate])
    if(loading || gLoading){
        return <Loading></Loading>
    }
    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
        console.log(data);
    }
    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-center block">Login</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("email", {
                                        required:{
                                            value: true,
                                            message: 'Email is required'
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: 'Provide a valid Email' 
                                        }})}
                                />
                                <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500"> {errors.email.message} </span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500"> {errors.email.message} </span>}
                                    
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Your Password"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("password", {
                                        required:{
                                            value: true,
                                            message: 'Password is Required'
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Must be 6 characters or longer' 
                                        }})}
                                />
                                <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500"> {errors.password.message} </span>}
                                {errors.password?.type === 'pattern' && <span className="label-text-alt text-red-500"> {errors.password.message} </span>}
                                    
                                </label>
                            </div>
    
                                        {singInError}
                            <input type="submit" className='btn w-full max-w-xs' value='Login' />
                        </form>
                        <p>New to Doctors Portal <Link to='/register' className='text-secondary'> Create and Account</Link> </p>
                        <div className="divider">OR</div>
                        <button className='btn btn-secondary' onClick={() => signInWithGoogle()}>Sign In With Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
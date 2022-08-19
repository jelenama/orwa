import React, {useState,useRef,useEffect} from 'react';
import AuthService from '../services/AuthService';
import Message from './Message';
import {Link,useNavigate} from 'react-router-dom';
import styles from "./styles2.module.css";

const SignUp = (props) => {
	const [user,setUser] = useState({email:"",
	username:"",
	role: "",
	password:"",});
    const [message,setMessage] = useState(null);
    let timerID = useRef(null);
    const navigate = useNavigate();
	

    useEffect(()=>{
        return ()=>{
            clearTimeout(timerID);
        }
    },[]);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const resetForm = ()=>{
        setUser({username : "", password : "",role : "",email:""});
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.register(user).then(data=>{
            const { message } = data;
            setMessage(message);
            resetForm();
            if(!message.msgError){
                timerID = setTimeout(()=>{
                console.log("uspjeh")
                navigate('/');
                },2000)
            }
        });
    }


	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/sign-in">
						<button type="button" className={styles.white_btn}>
							Login
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={onSubmit}>
						<h1>Create Account</h1>
                        <input
							type="email"
							placeholder="Email"
							name="email"
							onChange={onChange}
							value={user.email}
							required
							className={styles.input}
						/>
                        <input
							type="text"
							placeholder="Username"
							name="username"
							onChange={onChange}
							value={user.username}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="role"
							name="role"
							onChange={onChange}
							value={user.role}
							required
							className={styles.input}
						/>

						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={onChange}
							value={user.password}
							required
							className={styles.input}
						/>
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
					{message ? <Message message={message}/> : null}
				</div>
			</div>
		</div>
	);
};

export default SignUp;

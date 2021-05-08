import React from 'react'
//import * as sessionActions from '../../store/session'
import { useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { demoLogin} from "../../store/session";

const DemoUser = () => {
	let history = useHistory()
	const dispatch = useDispatch()

	//valid alternate:
    //const setDemoLogin = async (e) => {
	// 	e.preventDefault()
	// 	const email = 'demo@aa.io'
	// 	const password = 'password'
	// 	const data = await dispatch(login(email, password))

    //     if(data.errors){
    //         setErrors(data.errors);
    //     }
	// 	if (!data.errors) history.push('/')
	// }

    const demoLoginWrapper = async (e) => {
        e.preventDefault()
        await dispatch(demoLogin())
        history.push('/feed')
    }
    //doesn't have to be a form could be a link, but not a link instead of a form
    return (
        <>
            <form onSubmit={demoLoginWrapper}>
                <div className="demo-link">
                    <input type="submit" value="Demo"/>
                </div>
            </form>
        </>
	)
}

export default DemoUser

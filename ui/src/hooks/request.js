import axios from "axios"
import { useState } from "react";


const useRequest = ({url, method, body, onSuccess}) => {

	const [errors, setErrors] = useState({})
	// const [res, setRes] = useState({})
	const doRequest = async () => {

		try{
			const res = await axios[method](url, body);
			// setRes(res);
			onSuccess(res);
			// return res
		}catch(err){
			console.log(err)
			// setErrors(err.response.data.errors)
		}
	}

	return {
		doRequest,
		errors,
		// res
	}
}

export {useRequest};
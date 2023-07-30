import jwt from 'jsonwebtoken';

const generateToken = (payload, secretSignature, tokenLife) => {
	try {
		return jwt.sign(
			{
				payload,
			},
			secretSignature,
			{
				expiresIn: tokenLife,
			},
		);
	} catch (error) {
		console.log(`Generate token failed:  + ${error}`);
		return null;
	}
};

const verifyToken = (token, secretSignature) => {
    try {
        return jwt.verify(token, secretSignature);
    }
    catch (err) {
        console.log(`Verify token failed:  + ${error}`);
		return null;
    }
}

export default {
    generateToken,
    verifyToken,
}
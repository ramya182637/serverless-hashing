import bcrypt from 'bcryptjs';
import axios from 'axios';

export const handler = async (event) => {
    const data = event.value;
    const saltRounds = 12;

    try {
        const hash = await bcrypt.hash(data, saltRounds);
        const response = 
        {
            banner: "B00982851",
            result: hash,
            arn: "arn:aws:states:us-east-1:081483530990:stateMachine:StateMachine-A3",
            action: "bcrypt",
            value: data
        };
        await postResponse(response, event.course_uri);
        return response;
    } 
    catch (error) 
    {
        throw new Error('Error hashing data');
    }
};

const postResponse = async (data, url) => {
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 5000
        });
        return response.data;
    } 
    catch (error) 
    {
        throw new Error('Error posting result');
    }
};

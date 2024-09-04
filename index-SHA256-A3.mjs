import crypto from 'crypto';
export const handler = async (event) => {
    const data = event.value;
    const hash = crypto.createHash('sha256').update(data, 'utf8').digest('hex');
    const response = {
        banner: "B00982851",
        result: hash,
        arn: "arn:aws:states:us-east-1:081483530990:stateMachine:StateMachine-A3",
        action: "sha256",
        value: data
    };
    await postResult(response, event.course_uri);
    return response;
};

const postResult = async (data, url) => {
    const postData = JSON.stringify(data);
    const { hostname, pathname, port, protocol } = new URL(url);
    const options = {
        hostname,
        port: port || (protocol === 'https:' ? 443 : 80),
        path: pathname,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length
        }
    };
};

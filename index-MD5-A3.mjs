import crypto from 'crypto';
import https from 'https';
import http from 'http';

export const handler = async (event) => {
    const data = event.value;
    const hash = crypto.createHash('md5').update(data, 'utf8').digest('hex');
    const response = {
        banner: "B00982851",
        result: hash,
        arn: "arn:aws:states:us-east-1:081483530990:stateMachine:StateMachine-A3",
        action: "md5",
        value: data
    };
    await postResponse(response, event.course_uri);
    return response;
};

const postResponse = async (data, url) => {
    const inputData = JSON.stringify(data);
    const { hostname, pathname, port, protocol } = new URL(url);
    const options = {
        hostname,
        port: port || (protocol === 'https:' ? 443 : 80),
        path: pathname,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': inputData.length
        }
    };

    const requestMethod = protocol === 'https:' ? https : http;

    return new Promise((resolve, reject) => {
        const req = requestMethod.request(options, (res) => {
            let response = '';
            res.on('data', (chunk) => {
                response += chunk;
            });
            res.on('end', () => {
                resolve(response);
            });
        });
        req.on('error', (e) => {
            reject(e);
        });
        req.write(inputData);
        req.end();
    });
};

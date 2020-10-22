import app from './app';

const serverPort = process.env.PORT || 3000

app.listen(serverPort, () => {
    console.log(`Server running on port: ${serverPort}`);
});
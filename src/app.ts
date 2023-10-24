import express from 'express'
import { getAllCompetitions } from './database/repository.js';
import competitionRouter from './routes/competition.js' 
import { auth } from 'express-openid-connect';

declare module 'express' {
    interface Request {
        openId?: IDBOpenDBRequest
    }
}

const app = express();
const externalUrl = process.env.RENDER_EXTERNAL_URL
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 3000

const baseURL = externalUrl || `http://localhost:${port}`

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: baseURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,

};
  


app.use(express.urlencoded());
app.use(express.json());      
app.use(auth(config))



// app.set("views", path.join(__dirname, "views"))
app.set('view engine', 'ejs');

app.get("/", async (req, res) => {
    // res.send('Hello from EXpress + TS!!!!!')
    console.log(req.oidc.isAuthenticated())


    if(!req.oidc.isAuthenticated()) {res.redirect('/login')}
    else {

        const user = req.oidc.user;
        if(user){
            res.render('index', {
                    competitions: await getAllCompetitions(user.name), 
                    isAuthenticated: req.oidc.isAuthenticated()
                }
            )
        }
    }
})




app.use('/competition', competitionRouter)


if(externalUrl){

    const hostname = '0.0.0.0'
    app.listen(port, hostname, () => {
        console.log(`Server running locally on  http://${hostname}:${port} and externaly on ${externalUrl}`);
    })
} else {
    app.listen(port, () => {
        console.log(`Server running locally on  ${baseURL}`);
    })
}

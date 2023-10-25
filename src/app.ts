import express from 'express'
import { getAllCompetitions, createCompetition } from './database/repository.js';
import competitionRouter from './routes/competition.js' 
import { auth } from 'express-openid-connect';

// const filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(filename);



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
  
// app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))

app.use(express.urlencoded());
app.use(express.json());      
app.use(auth(config))

// console.log(__dirname)

app.set('views', './views')
app.set('view engine', 'ejs');

app.get("/", async (req, res) => {
    // res.send('Hello from EXpress + TS!!!!!')
    console.log(req.oidc.isAuthenticated())


    if(!req.oidc.isAuthenticated()) {res.redirect('/login')}
    else {

        const user = req.oidc.user;
        if(user){
            res.render('index', {
                    competitions: await getAllCompetitions(user.email), 
                    isAuthenticated: req.oidc.isAuthenticated()
                }
            )
        }
    }
})

app.post('/', async (req, res) => {
    // console.log(req.body)
    
    const name = req.body.name
    const victory_points : number = parseInt(req.body.victoryPoints);
    const draw_points : number = parseInt(req.body.drawPoints);
    const loss_points : number = parseInt(req.body.lossPoints);
    const competitorsUntrimed: string[] = req.body.competitors.split(/[\n;]/)

    // console.log(competitorsUntrimed)

    const competitors : string[] = competitorsUntrimed.map(competitor => {return competitor.trim()})

    const scoring :number[] = []

    scoring.push(victory_points)
    scoring.push(draw_points)
    scoring.push(loss_points)

    if(competitors.length < 4 || competitors.length > 8) {
        //neki error
        console.log("Error")
        console.log(`Competitors length ${competitors.length}`)
        // console.log(competitors)

    } else {
        console.log("Creating competition")
        // console.log(competitors)
        try {

            if(req.oidc.isAuthenticated() && req.oidc.user){
                const creator = req.oidc.user.email

                
                    await createCompetition(name, scoring, competitors, creator)

               
            }

        } catch(e){
            console.log(`Error while creating competition: ${e}`)
        }
    }


    res.redirect('/')
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

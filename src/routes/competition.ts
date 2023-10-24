import express from 'express'
import { createCompetition, getCompetition, getStandings, getAllGames, updateGameResult} from '../database/repository.js'
import { roundRobin } from '../util/roundRobin.js'
import Game from '../game.js'
const competitionRouter = express.Router()


// competitionRouter.get('/', (req, res) => {
//     res.render('create-competition')
// })

competitionRouter.post('/', async (req, res) => {
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
                const creator = req.oidc.user.name
                await createCompetition(name, scoring, competitors, creator)

            }

        } catch(e){
            console.log(e)
        }
    }


    res.redirect('/')
})



competitionRouter.get('/:id', async (req, res) =>{

    const id = parseInt(req.params.id)

    const competition = await getCompetition(id)
    const standings = await getStandings(id)
    

    const games = await getAllGames(id);


    // for(let key of games.keys()){
    //     games.get(key)?.map(game =>{
    //         console.log(`${game.first_name} ${game.first_score} - ${game.second_score} ${game.second_name}`)
    //     })
        
        
    // }

    res.render('competition', {
        competition: competition,
        standings: standings,
        games: games,
        isAuthenticated: req.oidc.isAuthenticated()
    })
}) 

competitionRouter.post('/:id', async (req, res) =>{


    const id = parseInt(req.params.id)
    
    const first_score = parseInt(req.body.first_score);
    const second_score = parseInt(req.body.second_score);
    const game_id = parseInt(req.body.game_id)

    if(Number.isNaN(first_score) || Number.isNaN(second_score)) {
        //error
    } else {
        await updateGameResult(game_id, first_score, second_score)
        console.log('Updated results')
    }
   

    res.redirect(`/competition/${id}`)
}) 



export default  competitionRouter;
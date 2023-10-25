
import pool from './connection.js'
import Game from '../game.js'
import { roundRobin } from '../util/roundRobin.js';



export async function getStandings(competition_id:number) {
    

    const standings : Object[] = [];
    const query = `SELECT competitor_name, games_played, wins, losses, draws, points 
                    FROM competitor 
                    WHERE competition_id = $1 
                    ORDER BY points DESC, games_played, wins, draws, losses`
    const results =  await pool.query(query, [competition_id])

   results.rows.forEach(r => {
        const standing = {
            competitor: r["competitor_name"],
            games_played: r["games_played"],
            wins: r['wins'],
            losses: r['losses'],
            draws: r['draws'],
            points: r["points"]
        }       
        standings.push(standing);
   });

    return standings;
}

export async function getCompetition(competition_id:number){
    const query = 'SELECT competition_name FROM competition WHERE competition_id = $1'
    const results =  await pool.query(query, [competition_id])


    if(results.rows[0].competition_name) {
        return results.rows[0].competition_name
    } else throw new Error(`Can't find competition with this id`)

}

export async function getAllGames(competition_id:number) {
    const query = `SELECT game_id, first_competitor_id, first_competitor.competitor_name as first_name,  second_competitor_id, second_competitor.competitor_name as second_name,
                            first_competitor_score as first_score, second_competitor_score as second_score, round 
                    FROM 
                    competitor first_competitor 
                    JOIN game ON first_competitor.competitor_id = game.first_competitor_id
                    JOIN competitor second_competitor ON second_competitor.competitor_id = game.second_competitor_id
                    WHERE  game.competition_id = $1
                    ORDER BY round ASC`
    

    const results = await pool.query(query, [competition_id])

    const games : Map<number, Game[]> = new Map<number, Game[]>()

    results.rows.forEach(r => {
        // console.log(`${ r['first_name']} ${parseInt(r['first_competitor_score'])} - ${parseInt(r['second_competitor_score'])} ${ r['second_name']}`)

        const game = new Game(
            competition_id,     
            parseInt(r['first_competitor_id']),
            parseInt(r['second_competitor_id']),
            parseInt(r['round']),
            parseInt(r['game_id']),
            r['first_name'],
            parseInt(r['first_score']),
            r['second_name'],
            parseInt(r['second_score'])
        )
        
        // console.log(`${ game.first_name} ${game.first_score} - ${game.second_score} ${game.second_name}`)

        
        let gameArray = games.get(game.round)

        if(gameArray) {
            gameArray.push(game)
        } else{
            games.set(game.round, [game])
        }
        
       
   });

   return games
}

export async function updateGameResult(game_id:number, first_competitor_score:number, second_competitor_score:number) {
    const query = "UPDATE game SET first_competitor_score = $1, second_competitor_score = $2 WHERE game_id = $3"
    await pool.query(query, [first_competitor_score, second_competitor_score, game_id])
}

export async function createCompetition(name:string, scoring:number[], competitors:string[], creator:string) {
    
    try{

        await pool.query('BEGIN')

        const query = "INSERT INTO competition (competition_name, victory_points, draw_points, loss_points, creator) VALUES ($1, $2, $3, $4, $5) RETURNING competition_id"
        const queryValues = [name, scoring[0], scoring[1], scoring[2], creator]
        const result = await pool.query(query, queryValues)
    
        let competition_id = parseInt(result.rows[0].competition_id);
    
        console.log(`Created competition with name ${name} and ID ${competition_id}`)


        console.log('Creating competitors')
        const competitorQuery = "INSERT INTO competitor (competitor_name, competition_id) VALUES ($1, $2) RETURNING competitor_id"

        const competitorIDs: number[] = []



        for(const competitor of competitors){
            // console.log(competitor)
            const competitorValues = [competitor, competition_id]
            const id = parseInt((await pool.query(competitorQuery, competitorValues)).rows[0].competitor_id)
            competitorIDs.push(id)
        }    
        

        console.log('Creating games')
        const gamesQuery = "INSERT INTO game (competition_id, first_competitor_id, second_competitor_id, round) VALUES($1, $2, $3, $4)"
        const games : Game[] | undefined = roundRobin(competition_id, competitorIDs)

        if(games !== undefined){
            for(const game of games){
                const gameValues = [game.competition_id, game.first_competitor_id, game.second_competitor_id, game.round]
                await pool.query(gamesQuery, gameValues)    
            }        

            await pool.query('COMMIT')

        } else {
            await pool.query('ROLLBACK')
        }

        

    } catch(e){
        await pool.query('ROLLBACK')
        throw e
    }

}


export async function getAllCompetitions(creator:string) {
    console.log("Getting all competitions...")
    const competitions: Object[] = []
    const query = "SELECT competition_id, competition_name FROM competition WHERE creator = $1"

    const results = await pool.query(query, [creator]);

    

    results.rows.forEach(r => {
        const competition = {
            id: r['competition_id'],
            name: r['competition_name']
        };

        competitions.push(competition)
    })

    return competitions;
}

